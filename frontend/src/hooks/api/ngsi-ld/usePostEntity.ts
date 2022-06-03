
import { useApiCallback } from '../useApiCallback';

export const usePostEntity = <EntityType,>(linkHeader: string): {
    makeRequest: (data: EntityType) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (data: EntityType) => hook.makeRequest({
            url: (process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/ngsi-ld/v1') + '/entities',
            // params: {
            //     options: "keyValues"
            // },
            headers: {
                Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
            },
            method: "post",
            data: data
        })
    };
};