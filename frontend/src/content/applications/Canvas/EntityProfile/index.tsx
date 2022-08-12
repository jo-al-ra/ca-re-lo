import { FC, useMemo } from 'react';
import { CustomNode } from '../types';
import { Box, Button, Card, CardActions, CardMedia, Typography } from '@mui/material';
import { categories } from 'src/config/categories';
import { useNavigate } from 'react-router';
interface EntityProfileProps {
    className?: string;
    node: CustomNode;
    reload: () => void;
}

const EntityProfile: FC<EntityProfileProps> = ({ node }) => {
    const navigate = useNavigate()
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

    const renderConsumeButton = () => {
        if (node?.ngsiObject?.type === "Asset" && !node?.ngsiObject?.consumedVia) {
            return (
                <CardActions>
                    <Button
                        variant="contained"
                        component="span"
                        onClick={() =>
                            navigate(`/carelo/activity/create?consumedAssetCategory=${node?.ngsiObject?.category?.value}&inputId=${node?.ngsiObject?.id}`)}
                    >
                        Consume
                    </Button>
                </CardActions>)
        }
    }

    return (
        <Card>
            <CardMedia
                image={image}
                sx={{ height: 140 }}
            />
            <Box py={2} pl={2}>
                <Typography gutterBottom variant="h3" component="h3">
                    {node?.ngsiObject?.name?.value}
                </Typography>
                <Typography variant="subtitle2">{node?.ngsiObject?.description?.value}</Typography>
            </Box>
            {renderConsumeButton()}
        </Card>
    );
}

export default EntityProfile;
