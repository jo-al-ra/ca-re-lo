import { FC, useState, useEffect } from 'react';
import {
    Card,
} from '@mui/material';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import Form from '@rjsf/material-ui/v5';
import { usePostEntity } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { normalize } from 'src/utils/ngsi-ld/normalize';


interface FormProps {
    className?: string;
    schemaURL: string;
}


const GeneratedForm: FC<FormProps> = ({ schemaURL }) => {

    const [data, setData] = useState({});
    const [resolvedSchema, setSchema] = useState<any>();
    const { makeRequest, error, loading, responseStatus } = usePostEntity("http://context/ngsi-context.jsonld")

    useEffect(() => {
        $RefParser.dereference(schemaURL).then(res =>
            setSchema(res));
    }, [schemaURL]);

    if (resolvedSchema === undefined) {
        return <div> Loading... </div>
    }

    return (
        <Card style={{ flex: 1, width: '100%', padding: 15 }}>
            <Form schema={resolvedSchema}
                formData={data}
                onSubmit={(event) => {
                    console.log(resolvedSchema)
                    console.log(event.formData)
                    makeRequest(normalize(event.formData, ["producedVia", "consumedVia"]))
                }} />
        </Card>
    )
};

export default GeneratedForm;
