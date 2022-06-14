import { FC } from 'react';
import {
    Card,
} from '@mui/material';
import Form from '@rjsf/material-ui/v5';
import { normalize } from 'src/utils/ngsi-ld/normalize';
import { formConfig } from 'src/utils/ngsi-ld/config';

interface FormProps {
    className?: string;
    type: string;
    onSubmit: (ngsiLdObject: any) => void
}


const AssetForm: FC<FormProps> = ({ type, onSubmit }) => {

    return (
        <Card style={{ flex: 1, width: '100%', padding: 15 }}>
            <Form schema={formConfig[type].schema}
                onSubmit={(event) => {
                    let data = event.formData;
                    data["dateCreated"] = new Date().toISOString()
                    data["dateModified"] = new Date().toISOString()
                    data["dataProvider"] = "urn:ngsi-ld:Actor:Jonathan"
                    data["owner"] = ["urn:ngsi-ld:Actor:Jonathan"]
                    data["type"] = formConfig[type].type
                    data["source"] = process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1' + `/entities/${data.id}`
                    let ngsiObject = normalize(event.formData, formConfig[type].relationshipKeys)
                    onSubmit(ngsiObject)
                }} />
        </Card>
    )
};

export default AssetForm;
