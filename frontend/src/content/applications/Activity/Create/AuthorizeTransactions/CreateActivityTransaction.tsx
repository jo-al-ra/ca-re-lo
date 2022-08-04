import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import { FC, useEffect, useState } from "react";
import { useCreateEntity } from "src/hooks/combined/useCreateEntity";
import { useWeb3MetaMask } from "src/hooks/eth/useWeb3MetaMask";
import { normalize } from "src/utils/ngsi-ld/normalize";

export interface CreateActivityTransactionProps {
    inputIds: string[];
    outputIds: string[];
    activityId: string;
    category: string;
}

const CreateActivityTransaction: FC<CreateActivityTransactionProps> = ({ inputIds, outputIds, activityId, category }) => {
    const createEntity = useCreateEntity()
    const [loading, setLoading] = useState(false)
    const [created, setCreated] = useState(false)
    const web3 = useWeb3MetaMask()
    const self = web3.name !== "Unnamed User" ? web3.name : web3.account
    const activityKeyValues = {
        id: activityId,
        type: "Activity",
        consumes: [...inputIds],
        produces: [...outputIds],
        category: category,
        source: process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1' + `/entities/${activityId}`,
        dateModified: new Date().toISOString(),
        dataProvider: self,
        dateCreated: new Date().toISOString(),
        owner: [self],
    }
    const activity = normalize(activityKeyValues, [])

    return (
        <ListItem
            secondaryAction={
                <Button
                    disabled={loading || created}
                    onClick={() => {
                        setLoading(true)
                        createEntity.makeRequests(activity)
                            .then(() => {
                                setLoading(false)
                                setCreated(true)
                            }).catch(e => {
                                console.log(e)
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
                primary={`Create activity`}
                secondary={activityId}
            />
        </ListItem>)
}

export default CreateActivityTransaction