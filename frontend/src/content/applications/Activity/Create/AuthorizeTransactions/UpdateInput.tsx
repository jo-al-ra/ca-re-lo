import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { FC, useEffect, useState } from "react";
import { useGetEntityById } from "src/hooks/api/ngsi-ld/useGetEntityById";
import { useUpdateEntity } from "src/hooks/combined/useUpdateEntity";

export interface UpdateInputProps {
    inputId: string;
    activityId: string;
    relationshipName: string;
}

const UpdateInput: FC<UpdateInputProps> = ({ inputId, relationshipName, activityId }) => {

    const getEntityById = useGetEntityById(process.env.CONTEXT ?? "http://context/ngsi-context.jsonld")
    const [input, setInput] = useState()
    useEffect(() => {
        setLoading(true)
        getEntityById.makeRequest(inputId, false)
            .then(entity => {
                let updatedEntity = entity
                updatedEntity[relationshipName] = { object: activityId, type: "Relationship" }
                setInput({ ...updatedEntity })
                setLoading(false)
            }).catch(e => {
                console.error(e)
                setLoading(false)
            })
    }, [])
    const updateEntity = useUpdateEntity(inputId, process.env.CONTEXT ?? "http://context/ngsi-context.jsonld")
    const [loading, setLoading] = useState(false)
    const [updated, setUpdated] = useState(false)

    return (
        <ListItem
            secondaryAction={
                <Button
                    disabled={loading || updated}
                    onClick={() => {
                        setLoading(true)
                        updateEntity.makeRequests(input)
                            .then(() => {
                                setLoading(false)
                                setUpdated(true)
                            }).catch(e => {
                                console.error(e)
                                setLoading(false)
                            })
                    }}>{loading ? "Loading" : updated ? "Updated" : "Authorize"}</Button>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`Update ${relationshipName} of input`}
                secondary={inputId}
            />
        </ListItem>)
}

export default UpdateInput