import { FC, useCallback, useEffect, useState } from 'react';
import Form from '@rjsf/material-ui/v5';
import { normalize } from 'src/utils/ngsi-ld/normalize';
import { formConfig, FormConfigItem } from 'src/utils/ngsi-ld/config';
import { resolveContextToSchema } from 'src/utils/ngsi-ld/resolveContextToSchema';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import Text from '../Text';
import { UiSchema } from '@rjsf/core';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';

interface FormProps {
    className?: string;
    type: string;
    onSubmit: (ngsiLdObject: any) => void
    readonly?: boolean;
    initialNgsiObject?: any;
    uiSchemaOverrides?: UiSchema;
    defaultValues?: any
}

interface FormState {
    config?: FormConfigItem;
    initialKeyValues: any;
    unknownConfig?: boolean;
}


const NgsiLDForm: FC<FormProps> = ({ type, onSubmit, initialNgsiObject, readonly, uiSchemaOverrides, defaultValues }) => {
    const [state, setState] = useState<FormState>()
    const { makeRequest, loading, error, responseStatus } = useGetEntityById(process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "http://context/json-context.jsonld")
    const web3 = useWeb3MetaMask()
    useEffect(() => {
        let newState = { ...state }
        if (formConfig[type]) {
            newState.config = formConfig[type]
            newState.unknownConfig = false
            resolveContextToSchema(process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "http://context/json-context.jsonld", type).then(async (res1) => {
                newState.config.schema = res1;
                newState.initialKeyValues = { ...defaultValues }
                if (initialNgsiObject) {
                    const res2 = await makeRequest(initialNgsiObject.id, true)
                    let keyValueObject = { ...res2 };
                    //convert single objects to arrays according to schema definition
                    res1.allOf?.forEach(allOf => {
                        Object.keys(allOf.properties).forEach(propertyKey => {
                            if (allOf?.properties[propertyKey]?.type == "array" && res2[propertyKey] && !Array.isArray(res2[propertyKey])) {
                                keyValueObject[propertyKey] = [res2[propertyKey]]
                            }
                        })
                    })
                    newState.initialKeyValues = { ...keyValueObject }
                }
                setState({ ...newState })
            })
        } else {
            newState.unknownConfig = true;
            setState({ ...newState })
        }
    }, [initialNgsiObject, type])

    if (state?.unknownConfig) {
        return (
            <Text>The selected type should not be edited by users.</Text>
        )
    }
    if (loading || !state?.config || (initialNgsiObject && !state?.initialKeyValues)) {
        return (
            <Text>Loading.</Text>
        )
    }

    return (
        <Form
            formData={state.initialKeyValues}
            readonly={readonly}
            schema={state.config.schema}
            onChange={(e) => {
                setState({
                    ...state,
                    initialKeyValues: e.formData
                })
            }}
            onSubmit={(event) => {
                let data = event.formData;
                const self = web3.name !== "Unnamed User" ? web3.name : web3.account
                if (!initialNgsiObject) {
                    data["dateCreated"] = new Date().toISOString()
                    data["owner"] = [self]
                    data["type"] = type
                    data["id"] = data.id.toLowerCase()
                    data["source"] = process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1' + `/entities/${data.id}`
                }
                data["dateModified"] = new Date().toISOString()
                data["dataProvider"] = self
                let ngsiObject = normalize(event.formData, state.config.relationshipKeys)
                onSubmit(ngsiObject)
            }}
            uiSchema={
                {
                    "ui:submitButtonOptions": {
                        props: {
                            disabled: !web3.active
                        },
                        norender: readonly,
                        submitText: initialNgsiObject ? "Update" : "Create"
                    },
                    ...uiSchemaOverrides
                }} />
    )
};

export default NgsiLDForm;
