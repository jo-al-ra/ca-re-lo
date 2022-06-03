import { Typography, Grid } from '@mui/material';
import { FC } from 'react';
import Form from '@rjsf/material-ui/v5';

interface PageHeaderProps {
    className?: string;
    onSubmit: (entityId: string) => void;
}

const schema: any = {
    title: "entityId",
    type: "string",
    description: "URN of the entity",
};

const PageHeader: FC<PageHeaderProps> = ({ onSubmit }) => {
    const user =
    {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Read Entity
                </Typography>
                <Typography variant="subtitle2">
                    {user.name}, enter the id of the entity in the form. The properties are displayed on the left side. Relationships are displayed in the graph on the right side
                </Typography>
            </Grid>
            <Grid item>
                <Form schema={schema}
                    onSubmit={(event) => {
                        console.log(event.formData);
                        onSubmit(event.formData)
                    }} />
            </Grid>
        </Grid>
    );
}

export default PageHeader;
