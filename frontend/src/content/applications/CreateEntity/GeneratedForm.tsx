import { FC, useState, useEffect } from 'react';
import {
    Card,
} from '@mui/material';

import $RefParser from '@apidevtools/json-schema-ref-parser';
import Form from '@rjsf/material-ui/v5';
import { normalize } from 'src/utils/ngsi-ld/normalize';


interface FormProps {
    className?: string;
    schemaURL: string;
    onSubmit: (ngsiLdObject: any) => void
}


const GeneratedForm: FC<FormProps> = ({ schemaURL, onSubmit }) => {

    const [data, setData] = useState({});
    const [resolvedSchema, setSchema] = useState<any>();

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
                    onSubmit(normalize(event.formData, ["producedVia", "consumedVia"]))
                }} />
        </Card>
    )
};

export default GeneratedForm;
