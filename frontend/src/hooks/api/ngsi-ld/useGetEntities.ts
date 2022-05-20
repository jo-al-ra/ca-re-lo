
import { useGetApiArray } from '../useGetApiArray';

export const useGetEntities = <EntityType,>(type: string, linkHeader: string): { data: EntityType[]; error: any; loading: boolean; refresh: () => void } => {
  return useGetApiArray({
    url: (process.env.REACT_APP_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/ngsi-ld/v1') + '/entities',
    params: {
      type: type,
      options: "keyValues"
    },
    headers: {
      Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
    }
  });
};