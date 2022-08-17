
import { getContextBrokerConnectionDetails } from 'src/config/contextBroker';
import { useApiArrayEffect } from '../useApiArrayEffect';

export const useGetEntities = <EntityType,>(type: string, linkHeader: string): { data: EntityType[]; error: any; loading: boolean; refresh: () => void } => {
  const connectionDetails = getContextBrokerConnectionDetails(window.location.hostname)
  return useApiArrayEffect({
    url: (connectionDetails.url) + '/entities',
    params: {
      type: type,
      options: "keyValues"
    },
    headers: {
      Link: `<${linkHeader}>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"`
    }
  });
};