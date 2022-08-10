import { useCallback, useState } from 'react';
import { ethers } from "ethers"
import { useWeb3MetaMask } from '../useWeb3MetaMask';
import { CareloRegistrar__factory } from 'src/typechain';
import { keyValues2contenthash, normalized2keyValues } from 'src/utils/ngsi-ld/conversion';

export const useCreateEntity = () => {
    const [loading, setLoading] = useState(false);
    const web3WithWallet = useWeb3MetaMask();

    const create = useCallback(async (entity: any) => {
        setLoading(true);
        try {
            if (!web3WithWallet.active) {
                return Promise.reject(new Error("You have to log in first"))
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3WithWallet.library.getSigner())
            if (! await careloRegistrar.controllers(web3WithWallet.account)) {
                return Promise.reject(new Error("You are not allowed to register new names in the Base Registrar"))
            }
            if (! await careloRegistrar.available(ethers.utils.id(entity.id))) {
                return Promise.reject(new Error("Id is already in use"))
            }
            const keyValues = normalized2keyValues(entity)
            const contentHash = await keyValues2contenthash(keyValues, "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld")

            const registerTx = await careloRegistrar.registerEntity(ethers.utils.id(entity.id), contentHash, entity.source.value)
            const registerReceipt = await registerTx.wait()
            return registerReceipt
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Unknown error occurred while trying to reach RPC Node"))
        }
    }, [web3WithWallet.active, web3WithWallet.account, web3WithWallet.library])

    return {
        loading,
        create,
    };
};
