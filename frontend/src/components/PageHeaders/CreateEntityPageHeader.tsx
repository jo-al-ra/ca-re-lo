import { Typography, Box, Tooltip, IconButton } from '@mui/material';
import { FC } from 'react';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

interface PageHeaderProps {
    className?: string;
    entityCategory: string;
    categoryDescription: string
}


const CreateEntityPageHeader: FC<PageHeaderProps> = (props) => {
    const navigate = useNavigate()

    return (
        <Box display="flex" mb={1}>
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
    );
}

export default CreateEntityPageHeader;
