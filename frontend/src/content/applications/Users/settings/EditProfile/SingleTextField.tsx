import { FC, useState } from "react";
import {
    Grid,
    Box,
    Button,
    TextField
} from '@mui/material';
import Text from 'src/components/Text';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";

export interface SingleTextFieldProps {
    title: string,
    description: string,
    suffix?: string,
    onSubmit: (value: string) => Promise<void>,
    value: string,
    disabled?: boolean
}

const SingleTextField: FC<SingleTextFieldProps> = ({ title, description, suffix, onSubmit, value, disabled }) => {
    const [editing, setEditing] = useState(false)
    const [name, setName] = useState("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                    {title}:
                </Box>
            </Grid>
            {editing ? <>
                <Grid item xs={11} sm={7} md={8} display="flex"
                    alignItems="center">
                    <TextField
                        required
                        label={title}
                        helperText={description}
                        value={name}
                        onChange={handleChange}
                    />
                    {suffix ? <Text color="black">
                        <b>{suffix}</b>
                    </Text> : undefined}
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                    <Button
                        variant="text"
                        startIcon={<DoneTwoToneIcon />}
                        onClick={async () => {
                            try {
                                await onSubmit(name)
                            } catch (e) {
                                console.log(e)
                            }
                            setEditing(false)
                        }}>
                        Save
                    </Button>
                    <Button
                        variant="text"
                        startIcon={<CloseTwoTone />}
                        onClick={() => {
                            setEditing(false)
                        }}>
                        Cancel
                    </Button>
                </Grid>
            </>
                :
                <>
                    <Grid item xs={11} sm={7} md={8}>
                        <Text color="black">
                            <b>{value}</b>
                        </Text>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}>
                        <Button
                            variant="text"
                            disabled={disabled}
                            startIcon={<EditTwoToneIcon />}
                            onClick={() => {
                                setEditing(true)
                            }}>
                            Edit
                        </Button>
                    </Grid>
                </>}
        </>
    )
}

export default SingleTextField