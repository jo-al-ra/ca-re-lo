import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { CustomNode } from '../types';
import ReactJson from 'react-json-view'
import { Card, CardContent, CardHeader, Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Form from '@rjsf/material-ui/v5';
import { resolveContextToSchema } from 'src/utils/ngsi-ld/resolveContextToSchema';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';

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

    useEffect(() => {
        console.log(keyValues)
        if (value !== "1" && needsLoading) {
            makeRequest(node.ngsiObject.id, true).then(res =>
                setkeyValues(res))
            resolveContextToSchema("http://context/ngsi-context.jsonld", node.ngsiObject?.type).then(res =>
                setSchema(res));
            setNeedsLoading(false);
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
            </TabContext>

        </Card>
    );
}

export default Details;
