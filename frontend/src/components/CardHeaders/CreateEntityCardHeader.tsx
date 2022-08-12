import { CardMedia } from '@mui/material';
import { FC } from 'react';

interface PageHeaderProps {
    className?: string;
    image: string;
}


const CreateEntityCardHeader: FC<PageHeaderProps> = (props) => {

    return (
        <CardMedia
            image={props.image}
            sx={{ height: 180 }}
        />
    );
}

export default CreateEntityCardHeader;
