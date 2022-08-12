import { Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FC } from 'react';

interface CategoryPickerProps {
    className?: string;
    availableCategories: string[];
    selectedCategory: string;
    handleChangeCategory: (string) => void;
}

const CategoryPicker: FC<CategoryPickerProps> = ({ availableCategories, selectedCategory, handleChangeCategory }) => {

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography variant="h3" component="h3" gutterBottom>
                    Select Category
                </Typography>
                <Typography variant="subtitle2">
                    Please select the category of the activity you have performed
                </Typography>
            </Grid>
            <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCategory}
                        label="category"
                        onChange={(event) => handleChangeCategory(event.target.value)}
                    >
                        {availableCategories.map((category) => (<MenuItem value={category}>{category}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default CategoryPicker;
