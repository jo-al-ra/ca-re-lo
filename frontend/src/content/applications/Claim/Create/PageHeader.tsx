import { Typography, Grid } from '@mui/material';
import { FC } from 'react';

interface PageHeaderProps {
    className?: string;
}

const PageHeader: FC<PageHeaderProps> = () => {
    const user =
    {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Create a claim for the asset
                </Typography>
                <Typography variant="subtitle2">
                    {user.name}, select the type of entity using the picker and fill out the form.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
