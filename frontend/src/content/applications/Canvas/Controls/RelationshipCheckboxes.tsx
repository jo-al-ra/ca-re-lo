import { FormControl, FormLabel, FormGroup, FormHelperText, FormControlLabel, Checkbox } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface RelationshipCheckboxProps {
    className?: string;
    relationshipNames: string[];
}


const RelationshipCheckboxes: FC<RelationshipCheckboxProps> = ({ relationshipNames }) => {
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
            </FormGroup>
        </FormControl>
    );
}

export default RelationshipCheckboxes;
