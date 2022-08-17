
import { getContextBrokerConnectionDetails } from 'src/config/contextBroker';
import { useApiCallback } from '../useApiCallback';

export const usePostEntityAttrs = <EntityType,>(entityId: string, linkHeader: string): {
    makeRequest: (data: EntityType) => Promise<any>;
    responseStatus: number;
    error: any;
    loading: boolean;
} => {
    const hook = useApiCallback();
    const connectionDetails = getContextBrokerConnectionDetails(window.location.host)
    return {
        responseStatus: hook.responseStatus,
        error: hook.error,
        loading: hook.loading,
        makeRequest: (data: EntityType) => hook.makeRequest({
            url: connectionDetails.url + `/entities/${entityId}/attrs`,
            headers: {
                Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
            },
            method: "post",
            data: data
        })
    };
};