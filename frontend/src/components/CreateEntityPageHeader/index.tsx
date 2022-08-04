import { Typography, Box, Tooltip, IconButton, Card, CardMedia } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

interface PageHeaderProps {
    className?: string;
    entityCategory: string;
    image: string;
    categoryDescription: string
}

const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);


const PageHeader: FC<PageHeaderProps> = (props) => {
    const navigate = useNavigate()

    return (
        <>
            <Box display="flex" mb={3}>
                <Tooltip arrow placement="top" title="Go back">
                    <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={() => navigate(-1)}>
                        <ArrowBackTwoToneIcon />
                    </IconButton>
                </Tooltip>
                <Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {`Create ${props.entityCategory} Entity`}
                    </Typography>
                    <Typography variant="subtitle2">
                        {props.categoryDescription}
                    </Typography>
                </Box>
            </Box>
            <CardCover>
                <CardMedia image={props.image} />
            </CardCover>
        </>
    );
}

export default PageHeader;
