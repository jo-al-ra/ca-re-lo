import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { FC, useState } from "react";
import { useCreateEntity } from "src/hooks/combined/useCreateEntity";

export interface CreateOutputProps {
    output: any
    onSuccess: () => void;
}

const CreateOutput: FC<CreateOutputProps> = ({ output, onSuccess }) => {
    const createEntity = useCreateEntity()
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false)

    return (
        <ListItem
            secondaryAction={
                <Button
                    disabled={loading || created}
                    onClick={() => {
                        setLoading(true)
                        createEntity.makeRequests(output)
                            .then(() => {
                                setLoading(false)
                                setCreated(true)
                                onSuccess()
                            }).catch(e => {
                                console.error(e)
                                setLoading(false)
                            })
                    }}>{loading ? "Loading" : created ? "Created" : "Authorize"}</Button>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Create output`}
                secondary={output.id}
            />
        </ListItem>)
}

export default CreateOutput