import { Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FC } from 'react';

interface PageHeaderProps {
    className?: string;
    availableSchemas: string[];
    selectedSchemaName: string;
    handleChangeSchema: (string) => void;
}

const PageHeader: FC<PageHeaderProps> = ({ availableSchemas, selectedSchemaName, handleChangeSchema }) => {
    const user =
    {
        name: 'Catherine Pike',
        avatar: '/static/images/avatars/1.jpg'
    };
    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Create Entity
                </Typography>
                <Typography variant="subtitle2">
                    {user.name}, select the type of entity using the picker and fill out the form.
                </Typography>
            </Grid>
            <Grid item>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Schema</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedSchemaName}
                        label="Schema name"
                        onChange={(event) => handleChangeSchema(event.target.value)}

                    >
                        <MenuItem value={"Select schema"}>Select schema</MenuItem>
                        {availableSchemas.map((schema) => (<MenuItem value={schema}>{schema}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default PageHeader;
