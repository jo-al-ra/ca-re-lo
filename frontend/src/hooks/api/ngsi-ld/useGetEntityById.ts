
import { getContextBrokerConnectionDetails } from 'src/config/contextBroker';
import { useApiCallback } from '../useApiCallback';

export const useGetEntityById = (linkHeader: string): {
    makeRequest: (entityId: string, keyValues?: boolean) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (entityId: string, keyValues: boolean = false) => {
            const keyValueOption = keyValues ? { options: "keyValues" } : {};
            const connectionDetails = getContextBrokerConnectionDetails(window.location.hostname)
            return hook.makeRequest({
                url: (connectionDetails.url) + '/entities/' + entityId,
                params: {
                    ...keyValueOption
                },
                headers: {
                    Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
                }
            })
        }
    };
};