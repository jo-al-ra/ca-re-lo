import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CustomNode } from '../types';
import ReactJson from 'react-json-view'
import { Button, Card, CardActions, CardContent, CardHeader, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Form from '@rjsf/material-ui/v5';
import { resolveContextToSchema } from 'src/utils/ngsi-ld/resolveContextToSchema';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import { usePostEntity } from 'src/hooks/api/canis-major/usePostEntity';

interface DetailsProps {
    className?: string;
    node: CustomNode;
}

const Details: FC<DetailsProps> = ({ node }) => {
    const [value, setValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [keyValues, setkeyValues] = useState<any>();
    const [schema, setSchema] = useState<any>();
    const [needsLoading, setNeedsLoading] = useState(true);
    const { makeRequest, loading, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
    const postDLTHook = usePostEntity("http://context/ngsi-context.jsonld")

    useEffect(() => {
        if (value !== "1" && needsLoading) {
            resolveContextToSchema("http://context/ngsi-context.jsonld", node.ngsiObject?.type).then(res1 => {
                setSchema(res1)

                makeRequest(node.ngsiObject.id, true).then(res2 => {
                    let keyValueObject = { ...res2 };
                    //convert single objects to arrays according to schema definition
                    res1.allOf?.forEach(allOf => {
                        Object.keys(allOf.properties).forEach(propertyKey => {
                            if (allOf?.properties[propertyKey]?.type == "array" && res2[propertyKey] && !Array.isArray(res2[propertyKey])) {
                                keyValueObject[propertyKey] = [res2[propertyKey]]
                            }
                        })
                    })
                    setkeyValues(keyValueObject)
                    setNeedsLoading(false);
                })
            });
        }
    }, [value, needsLoading])

    useEffect(() => {
        if (node) {
            setNeedsLoading(true)
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
                        {schema === undefined || keyValues === undefined ? <div> Loading... </div> :
                            <Form
                                readonly
                                schema={schema}
                                formData={keyValues}
                                onSubmit={(event) => {
                                    console.log(event)
                                }}
                                uiSchema={
                                    {
                                        "ui:submitButtonOptions": {
                                            props: {
                                                disabled: true
                                            },
                                            norender: true,
                                            submitText: "Update"
                                        }
                                    }} />
                        }
                    </TabPanel>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        postDLTHook.makeRequest(node.ngsiObject)
                            .then(res => console.log(res))
                            .catch(error => console.error(error))
                    }}>Persist on DLT</Button>
                </CardActions>
            </TabContext>

        </Card>
    );
}

export default Details;
