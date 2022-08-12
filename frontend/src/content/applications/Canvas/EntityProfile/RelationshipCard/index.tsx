import { FC } from "react";
import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Switch
} from '@mui/material';
import HubTwoToneIcon from '@mui/icons-material/HubTwoTone';

export interface RelationshipCardProps {
    displayRelationshipState: { [relationshipName: string]: boolean };
    onToggleDisplayRelationship: (relationshipName: string, value: boolean) => void;
}



const RelationshipCard: FC<RelationshipCardProps> = (props) => {

    const renderRelationshipSwitch = (relationshipName: string) => {
        return (
            <Box sx={{ pt: 3 }}>
                <Grid container alignItems="center">
                    <Grid item xs={9}>
                        <Typography variant="subtitle2" noWrap mr={1}>
                            {relationshipName}
                        </Typography>

                    </Grid>
                    <Grid item xs={3}>
                        <Switch
                            checked={props.displayRelationshipState[relationshipName]}
                            onChange={(event) => {
                                props.onToggleDisplayRelationship(relationshipName, event.target.checked)
                            }}
                            inputProps={{ 'aria-label': 'controlled' }} />
                    </Grid>
                </Grid>
            </Box>
        )
    }
    return (
        <Card sx={{ px: 1 }}>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={10}>
                        <Typography variant="h3" noWrap>
                            Display Relationships
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <HubTwoToneIcon color="info" fontSize="large" />
                    </Grid>
                </Grid>
                {Object.keys(props.displayRelationshipState ?? {}).map(key => renderRelationshipSwitch(key))}
            </CardContent>
        </Card>
    )
}

export default RelationshipCard