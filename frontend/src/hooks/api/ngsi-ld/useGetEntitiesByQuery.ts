
import { useApiCallback } from '../useApiCallback';

export const useGetEntitiesByQuery = (): {
    makeRequest: (type: string, query: string, linkHeader: string, keyValues?: boolean,) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (type: string, query: string, linkHeader: string, keyValues: boolean = false) => {
            const keyValueOption = keyValues ? { options: "keyValues" } : {};
            return hook.makeRequest({
                url: (process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1') + '/entities',
                params: {
                    type: type,
                    q: query,
                    ...keyValueOption
                },
                headers: {
                    Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`,
                    "NGSILD-Tenant": "orion"
                }
            })
        }
    };
};