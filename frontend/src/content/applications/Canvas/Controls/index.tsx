import { FC, useMemo } from 'react';
import { Card, CardHeader, CardContent, Divider, Button, FormControlLabel, Checkbox, FormControl, FormLabel, FormGroup, FormHelperText } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CustomNode, IncomingRelationshipParameter } from '../types';
import RelationshipCheckboxes from './RelationshipCheckboxes';
import EntityTable from './EntityTable';

interface ControlsProps {
    className?: string;
    onLoadRelationships: (outgoing: string[], incoming: IncomingRelationshipParameter[]) => void;
    selectedNode?: CustomNode;
    onLoadEntityById: (entityId: string) => void;
}


const Controls: FC<ControlsProps> = ({ onLoadRelationships, selectedNode, onLoadEntityById }) => {
    const initialOutgoingRelationships = useMemo(() => selectedNode ?
        Object.keys(selectedNode.ngsiObject)
            .filter(key => {
                return "Relationship" === selectedNode.ngsiObject[key]?.type
            })
        :
        []
        , [selectedNode])



    return (
        <Card>
            <CardHeader title="Controls" />
            <Divider />
            <CardContent>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Load Relationships</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RelationshipCheckboxes
                            relationshipNames={initialOutgoingRelationships}
                            onSubmit={(outgoing, incoming) => {
                                onLoadRelationships(outgoing, incoming)
                            }} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography>Owned Entities</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <EntityTable onSelectRow={(entityId) => { onLoadEntityById(entityId) }} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography>Edit entity</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}

export default Controls;
