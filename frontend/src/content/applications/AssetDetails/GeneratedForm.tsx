import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
    Divider,
    Card,
    CardHeader
} from '@mui/material';
import {
    materialRenderers,
    materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { SmartDataModelsXXXdataModelXXXSchema } from 'src/models/SmartDataModelsXXXdataModelXXXSchema '

// import mySchemaWithReferences from '../../../models/testschema.json';
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser';
import { JsonSchema } from '@jsonforms/core';

import { withTheme } from '@rjsf/core';
import Form from '@rjsf/material-ui/v5';

// const yourRemoteSchemaResolver = {
//     order: 1,
//     canRead: function (file) {
//         return file.url.indexOf('https://smart-data-models.github.io/dataModel.Building/Building/schema.json') !== -1;
//     },
//     read: function () {
//         return JSON.stringify(mySchemaWithReferences);
//     },
// };
// const refParserOptions = {
//     dereference: {
//         circular: false
//     },
//     resolve: {
//         foo: yourRemoteSchemaResolver
//     }
// }

interface FormProps {
    className?: string;
    asset: SmartDataModelsXXXdataModelXXXSchema;
}


const GeneratedForm: FC<FormProps> = ({ asset }) => {

    const [data, setData] = useState({});
    const [resolvedSchema, setSchema] = useState<any>();

    useEffect(() => {
        $RefParser.dereference("https://smart-data-models.github.io/dataModel.Building/Building/schema.json").then(res => setSchema(res));
        // or
        // JsonRefs.resolveRefs(mySchemaWithReferences).then(res => setSchema(res.resolved));
    }, []);

    if (resolvedSchema === undefined) {
        return <div> Loading... </div>
    }

    return (
        <Card style={{ flex: 1, width: '100%' }}>
            <CardHeader title="Details" />
            <Divider />
            <Form schema={resolvedSchema} formData={data} />


            {/* <JsonForms
                schema={resolvedSchema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, errors }) => setData(data)}
            /> */}
        </Card>
    )
};

export default GeneratedForm;
