import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CustomNode } from '../types';
import ReactJson from 'react-json-view'
import { Button, Card, CardActions, CardContent, CardHeader, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { usePostEntityAttrs as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntityAttrs';
import { usePostEntityAttrs as useCaMaCallback } from 'src/hooks/api/canis-major/usePostEntityAttrs';
import { useSnackbar } from 'notistack';
import { useUpdateContenthash } from 'src/hooks/eth/ens/useUpdateContenthash';

interface DetailsProps {
    className?: string;
    node: CustomNode;
    reload: () => void;
}

const Details: FC<DetailsProps> = ({ node, reload }) => {
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

    useEffect(() => {
        if (value === "2") {
            makeRequest(node.ngsiObject.id, true).then(res2 => {
                setkeyValues(res2)
            })
        }
    }, [value])

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
                <CardHeader title="Details" action={
                    <TabList variant="scrollable"
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary" onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="NGSI-LD" value="1" />
                        <Tab label="KeyValues" value="2" />
                        <Tab label="Form" value="3" />
                    </TabList>
                } />
                <CardContent>
                    <TabPanel value={"1"}>
                        <ReactJson src={node.ngsiObject} />
                    </TabPanel>
                    <TabPanel value={"2"}>
                        <ReactJson src={keyValues} />
                    </TabPanel>
                    <TabPanel value={"3"}>
                        <NgsiLDForm
                            readonly={!inEditMode}
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
                                        console.log(e2)
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
                    </TabPanel>
                </CardContent>
                <CardActions>
                    {inEditMode ?
                        <Button size="small" onClick={() => {
                            setInEditMode(false)
                        }}>
                            Cancel
                        </Button>
                        :
                        <Button size="small" onClick={() => {
                            setValue("3")
                            setInEditMode(true)
                        }}>
                            Edit
                        </Button>
                    }

                </CardActions>
            </TabContext>

        </Card>
    );
}

export default Details;
