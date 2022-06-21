
import { useApiCallback } from '../useApiCallback';

export const usePostEntityAttrs = <EntityType,>(entityId: string, linkHeader: string): {
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
            url: (process.env.REACT_APP_CANIS_MAJOR_BASE_URL ?? 'http://localhost/canis-major/ngsi-ld/v1') + `/entities/${entityId}/attrs`,
            headers: {
                Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`,
                "Wallet-Type": "Vault",
                "Wallet-Token": "vault-plaintext-root-token",
                "Wallet-Address": "http://vault:8200/v1/ethereum/accounts/franzi"
            },
            method: "post",
            data: data
        })
    };
};