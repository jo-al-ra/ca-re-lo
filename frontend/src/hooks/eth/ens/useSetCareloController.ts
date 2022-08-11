import { useCallback, useState } from 'react';
import { useWeb3MetaMask } from '../useWeb3MetaMask';
import { CareloRegistrar__factory } from 'src/typechain';

export const useSetCareloController = () => {
    const [loading, setLoading] = useState(false);
    const web3WithWallet = useWeb3MetaMask();

    const setCareloController = useCallback(async (nameOrAddress: string, adding: boolean) => {
        setLoading(true);
        try {
            if (!web3WithWallet.active) {
                return Promise.reject(new Error("You have to log in first"))
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3WithWallet.library.getSigner())
            if (await careloRegistrar.owner() !== web3WithWallet.account) {
                return Promise.reject(new Error("You have to be the owner of the carelo contract"))
            }

            if (adding) {
                const addControllerTx = await careloRegistrar.addController(nameOrAddress)
                const addControllerReceipt = await addControllerTx.wait()
                return addControllerReceipt
            } else {
                const removeControllerTx = await careloRegistrar.removeController(nameOrAddress)
                const removeControllerReceipt = await removeControllerTx.wait()
                return removeControllerReceipt
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
            return Promise.reject("Unknown error occurred while trying to reach RPC Node")
        }
    }, [web3WithWallet.active, web3WithWallet.library])

    return {
        loading,
        setCareloController,
    };
};
