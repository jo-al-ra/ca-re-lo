import { FC, useState } from "react";
import {
    Grid,
    Box,
    Button,
    TextField
} from '@mui/material';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import { useSetCareloController } from "src/hooks/eth/ens/useSetCareloController";


const AddControllerField: FC = () => {
    const { setCareloController } = useSetCareloController()
    const [name, setName] = useState("")
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                    modify controller status:
                </Box>
            </Grid>
            <Grid item xs={11} sm={7} md={8} display="flex"
                alignItems="center">
                <TextField
                    required
                    label="name or address"
                    helperText={"name or address of the account you want to modify the controller status of"}
                    value={name}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={1} sm={1} md={1}>
                <Button
                    variant="text"
                    startIcon={<DoneTwoToneIcon />}
                    disabled={!name}
                    onClick={async () => {
                        try {
                            await setCareloController(name, true)
                        } catch (e) {
                            console.error(e)
                        }
                    }}>
                    Add
                </Button>
                <Button
                    variant="text"
                    startIcon={<CloseTwoTone />}
                    disabled={!name}
                    onClick={async () => {
                        try {
                            await setCareloController(name, false)
                        } catch (e) {
                            console.error(e)
                        }
                    }}>
                    Remove
                </Button>
            </Grid>
        </>
    )
}

export default AddControllerField