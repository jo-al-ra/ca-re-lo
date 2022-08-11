import { FC } from 'react';
import { CustomNode } from '../types';
import { Box, Card, CardMedia, Typography } from '@mui/material';
interface EntityProfileProps {
    className?: string;
    node: CustomNode;
    reload: () => void;
}

const EntityProfile: FC<EntityProfileProps> = ({ node, children }) => {

    if (!node) {
        return (
            <Card style={{ flex: 1, width: '100%', padding: 15 }}>
                <div>Please select an entity from the canvas</div>
            </Card>
        )
    }

    return (
        <Card>
            <CardMedia
                image={"/static/images/entities/Biomass.jpg"}
                sx={{ height: 140 }}
            />
            <Box py={2} pl={2} mb={3}>
                <Typography gutterBottom variant="h3" component="h3">
                    {node?.ngsiObject?.name?.value}
                </Typography>
                <Typography variant="subtitle2">{node?.ngsiObject?.description?.value}</Typography>
            </Box>
        </Card>
    );
}

export default EntityProfile;
