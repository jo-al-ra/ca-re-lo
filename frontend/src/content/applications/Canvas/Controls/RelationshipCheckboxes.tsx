import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Box } from '@mui/material';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { IncomingRelationshipParameter } from '../types';

interface RelationshipCheckboxesProps {
    className?: string;
    relationshipNames: string[];
    onSubmit: (outgoing: string[], incoming: IncomingRelationshipParameter[]) => void
}

const incomingRelationshipConfig = {
    Safeguard: {
        context: "http://context/ngsi-context.jsonld",
        relationshipName: "refEntity"
    },
    DLTtxReceipt: {
        context: "https://raw.githubusercontent.com/smart-data-models/dataModel.DistributedLedgerTech/master/context.jsonld",
        relationshipName: "refEntity"
    }
}

const RelationshipCheckboxes: FC<RelationshipCheckboxesProps> = ({ relationshipNames, onSubmit }) => {
    const [outgoingState, setOutgoingState] = useState({});
    const [incomingState, setIncomingState] = useState({
        Safeguard: false,
        DLTtxReceipt: false
    })
    useEffect(() => {
        setOutgoingState({
            ...relationshipNames.reduce(
                (previousValue, currentValue) => ({ ...previousValue, [currentValue]: false }),
                {})
        })
    }, [relationshipNames])
    const renderCheckboxes = (
        state: { [x: string]: boolean; },
        setState: { (value: SetStateAction<{}>): void; (value: SetStateAction<{ [x: string]: boolean; }>): void; (arg0: any): void; }
    ) =>
        Object.keys(state).map(key => {
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
        <Box>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Select outgoing relationships</FormLabel>
                <FormGroup>
                    {renderCheckboxes(outgoingState, setOutgoingState)}
                </FormGroup>
            </FormControl>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">Select incoming relationships</FormLabel>
                <FormGroup>
                    {renderCheckboxes(incomingState, setIncomingState)}
                </FormGroup>
            </FormControl>
            <Button style={{ margin: 24 }} onClick={() => {
                onSubmit(
                    Object.keys(outgoingState).filter(key => outgoingState[key]),
                    Object.keys(incomingState).filter(key => incomingState[key]).map(key => ({
                        type: key,
                        context: incomingRelationshipConfig[key].context,
                        relationshipName: incomingRelationshipConfig[key].relationshipName
                    }))
                )
            }}>
                Load Relationships
            </Button>
        </Box>
    );
}

export default RelationshipCheckboxes;
