import { useSnackbar } from "notistack";
import { useCreateEntity as useCreateEntityENS } from "../eth/ens/useCreateEntity";
import { usePostEntity } from 'src/hooks/api/ngsi-ld/usePostEntity';

export const useCreateEntity = () => {
    const createEntityENS = useCreateEntityENS();
    const createEntityContextBroker = usePostEntity(process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const makeRequests = async (entity: any) => {
        try {
            await createEntityENS.create(entity)
            enqueueSnackbar(`Saved contenthash for ${entity.id}.carelo in carelo chain`, {
                variant: "success"
            })
        } catch (e) {
            enqueueSnackbar(e.message ?? "Failed to save the contenthash in carelo chain", {
                variant: "error"
            })
            return Promise.reject(e.message ?? "Failed to create entity in carelo chain")
        }
        try {
            await createEntityContextBroker.makeRequest(entity)
            enqueueSnackbar("Entity created in Context Broker", {
                variant: "success"
            })
        } catch (e) {
            enqueueSnackbar(e.message ?? "Failed to create entity in Context Broker", {
                variant: "error"
            })
            return Promise.reject(e.message ?? "Failed to create entity in Context Broker")
        }
        return Promise.resolve()
    }

    return { makeRequests }
}