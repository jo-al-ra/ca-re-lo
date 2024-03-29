import { useCallback, useState } from 'react';
import { ethers } from "ethers"
import { useWeb3MetaMask } from '../useWeb3MetaMask';
import { CareloRegistrar__factory } from 'src/typechain';
import { keyValues2contenthash, normalized2keyValues } from 'src/utils/ngsi-ld/conversion';

export const useUpdateContenthash = () => {
    const [loading, setLoading] = useState(false);
    const web3WithWallet = useWeb3MetaMask();

    /**
     * computes the contenthash from a normalized entity and updates the hash in the ens
     */
    const updateContenthash = useCallback(async (entity: any) => {
        setLoading(true);
        try {
            if (!web3WithWallet.active) {
                return Promise.reject(new Error("You have to log in first"))
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3WithWallet.library.getSigner())
            const keyValues = normalized2keyValues(entity)
            const contentHash = await keyValues2contenthash(keyValues, process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld")

            const updateTx = await careloRegistrar.setContenthash(ethers.utils.namehash(`${entity.id}.carelo`), contentHash)
            const updateReceipt = await updateTx.wait()
            // setLoading(false)
            return updateReceipt
        } catch (error) {
            console.error(error);
            setLoading(false)
            return Promise.reject("Unknown error occurred while trying to reach RPC Node")
        }
    }, [web3WithWallet.active, web3WithWallet.library])

    return {
        loading,
        updateContenthash,
    };
};
