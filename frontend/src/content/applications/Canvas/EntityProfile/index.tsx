import { FC, useMemo } from 'react';
import { CustomNode } from '../types';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { categories } from 'src/config/categories';
interface EntityProfileProps {
    className?: string;
    node: CustomNode;
    reload: () => void;
}

const EntityProfile: FC<EntityProfileProps> = ({ node }) => {
    const image = useMemo(() => {
        return categories[node?.ngsiObject?.category?.value]?.image
    }, [node?.ngsiObject])

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
                image={image}
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
