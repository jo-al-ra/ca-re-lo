import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CustomNode } from '../types';
import ReactJson from 'react-json-view'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { usePostEntityAttrs as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntityAttrs';
import { useSnackbar } from 'notistack';
import { useUpdateContenthash } from 'src/hooks/eth/ens/useUpdateContenthash';
import DetailsList from './DetailsList';
import { useNavigate } from 'react-router';

interface AdvancedCardProps {
    className?: string;
    node: CustomNode;
    reload: () => void;
}

const AdvancedCard: FC<AdvancedCardProps> = ({ node, reload }) => {
    const [value, setValue] = useState("1");
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const [keyValues, setkeyValues] = useState<any>();
    const [inEditMode, setInEditMode] = useState<boolean>(false)
    const { makeRequest, loading, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
    const { updateContenthash } = useUpdateContenthash();
    const postCoBrCallback = useCoBrCallback(node?.id as string, "http://context/ngsi-context.jsonld");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate()

    useEffect(() => {
        if (node) {
            makeRequest(node.ngsiObject.id, true).then(res2 => {
                setkeyValues(res2)
            })
        }
    }, [node])

    if (!node) {
        return (
            <Card style={{ flex: 1, width: '100%', padding: 15 }}>
                <div>Please select an entity from the canvas</div>
            </Card>
        )
    }

    return (
        <Card style={{ flex: 1, width: '100%', padding: 15 }}>
            <TabContext value={value}>
                {inEditMode ?
                    (
                        <>
                            <CardHeader title="Advanced" />
                            <CardContent>
                                <NgsiLDForm
                                    type={node.ngsiObject.type}
                                    initialNgsiObject={node.ngsiObject}
                                    onSubmit={(object) => {
                                        updateContenthash(object).then(res1 => {
                                            enqueueSnackbar("DLTtxReceipt created", {
                                                variant: "success"
                                            })
                                            postCoBrCallback.makeRequest(object).then(res2 => {
                                                enqueueSnackbar("Entity updated in Context Broker", {
                                                    variant: "success"
                                                })
                                                setInEditMode(false)
                                                reload();
                                            }).catch(e2 => {
                                                console.error(e2)
                                                enqueueSnackbar("Failed to update entity in Context Broker", {
                                                    variant: "error"
                                                })
                                            })
                                        }).catch(e1 => {
                                            enqueueSnackbar(e1.message ?? "Failed to create DLTtxReceipt", {
                                                variant: "error"
                                            })
                                        })
                                    }}
                                />
                            </CardContent>
                        </>

                    )
                    :
                    (
                        <>
                            <CardHeader title="Advanced" action={
                                <TabList variant="scrollable"
                                    scrollButtons="auto"
                                    textColor="primary"
                                    indicatorColor="primary"
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Pretty" value="1" />
                                    <Tab label="JSON" value="2" />
                                </TabList>
                            } />
                            <CardContent>
                                <TabPanel value={"1"}>
                                    <DetailsList keyValuesObject={keyValues} loading={loading} />
                                </TabPanel>
                                <TabPanel value={"2"}>
                                    <ReactJson src={keyValues} />
                                </TabPanel>
                            </CardContent>
                        </>
                    )}
                <CardActions>
                    {inEditMode ?
                        <Button size="small" variant="contained" onClick={() => {
                            setInEditMode(false)
                        }}>
                            Cancel
                        </Button>
                        :
                        <Button size="small" variant="contained" onClick={() => {
                            setInEditMode(true)
                        }}>
                            Edit
                        </Button>
                    }
                    <Button
                        size="small"
                        variant="contained"
                        onClick={async () => {
                            navigate("/carelo/activity/create", {
                                state: {
                                    initialConsumes: [node.ngsiObject.id]
                                }
                            })
                        }}
                    >
                        Consume
                    </Button>
                </CardActions>
            </TabContext >

        </Card >
    );
}

export default AdvancedCard;
