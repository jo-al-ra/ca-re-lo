import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { IncomingRelationshipParameter } from '../types';

interface RelationshipCheckboxesProps {
    className?: string;
    relationshipNames: string[];
    onSubmit: (outgoing: string[], incoming: IncomingRelationshipParameter[]) => void
}


const RelationshipCheckboxes: FC<RelationshipCheckboxesProps> = ({ relationshipNames, onSubmit }) => {
    const [state, setState] = useState({});
    useEffect(() => {
        setState({
            ...relationshipNames.reduce(
                (previousValue, currentValue) => ({ ...previousValue, [currentValue]: false }),
                {})
        })
    }, [relationshipNames])
    const renderCheckboxes = () => Object.keys(state).map(key => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state[key]}
                        onChange={(event) => {
                            setState({
                                ...state,
                                [event.target.name]: event.target.checked
                            })
                        }}
                        name={key} />
                }
                label={key}
            />
        )
    })

    return (
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Select outgoing relationships</FormLabel>
            <FormGroup>
                {renderCheckboxes()}
                <Button onClick={() => {
                    onSubmit(Object.keys(state).filter(key => state[key]), [])
                }}>
                    Load Relationships
                </Button>
            </FormGroup>
        </FormControl>
    );
}

export default RelationshipCheckboxes;
