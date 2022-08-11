import { FC } from 'react';
import { CustomNode } from '../types';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);
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

        <>
            <CardCover>
                <CardMedia image={"/static/images/entities/Biomass.jpg"} />
            </CardCover>
            <Box py={2} pl={2} mb={3}>
                <Typography gutterBottom variant="h4">
                    {node?.ngsiObject?.name?.value}
                </Typography>
                <Typography variant="subtitle2">{node?.ngsiObject?.description?.value}</Typography>
            </Box>
            {children}
        </>);
}

export default EntityProfile;
