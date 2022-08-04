import { useSnackbar } from "notistack";
import { BaseModel } from "src/models/BaseModel";
import { usePostEntityAttrs } from "../api/ngsi-ld/usePostEntityAttrs";
import { useUpdateContenthash } from "../eth/ens/useUpdateContenthash";

export const useUpdateEntity = (entityId: string, context: string) => {
    const { updateContenthash } = useUpdateContenthash();
    const postCoBrCallback = usePostEntityAttrs(entityId, context);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const makeRequests = async (entity: BaseModel) => {
        try {
            await updateContenthash(entity)
            enqueueSnackbar("DLTtxReceipt created", {
                variant: "success"
            })
        } catch (e) {
            enqueueSnackbar(e.message ?? "Failed to create DLTtxReceipt", {
                variant: "error"
            })
            return Promise.reject(e.message ?? "Failed to create DLTtxReceipt")
        }
        try {
            await postCoBrCallback.makeRequest(entity)
            enqueueSnackbar("Entity updated in Context Broker", {
                variant: "success"
            })
        } catch (e) {
            enqueueSnackbar(e.message ?? "Failed to update entity in Context Broker", {
                variant: "error"
            })
            return Promise.reject(e.message ?? "Failed to update entity in Context Broker")
        }
        return Promise.resolve()
    }

    return { makeRequests }
}