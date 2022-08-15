
import { useApiCallback } from '../useApiCallback';

export interface ContextBrokerParams {
    type?: string;
    query?: string;
    linkHeader: string;
    keyValues?: boolean;
    ngsiLdTenant?: string;
    id?: string;
}

export const useGetEntitiesByQuery = (): {
    makeRequest: (requestParams: ContextBrokerParams) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (requestParams: ContextBrokerParams) => {
            return hook.makeRequest({
                url: (process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1') + '/entities',
                params: {
                    ...requestParams.type && { type: requestParams.type },
                    ...requestParams.query && { q: requestParams.query },
                    ...requestParams.id && { id: requestParams.id },
                    ...requestParams.keyValues && { options: "keyValues" }
                },
                headers: {
                    Link: `<${requestParams.linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`,
                    ...requestParams.ngsiLdTenant && { "NGSILD-Tenant": requestParams.ngsiLdTenant }
                }
            })
        }
    };
};