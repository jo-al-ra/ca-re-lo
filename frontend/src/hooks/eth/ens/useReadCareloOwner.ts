import { useCallback } from 'react';
import { CareloRegistrar__factory } from 'src/typechain';
import { useEagerWeb3RPC } from '../useEagerWeb3RPC';

export const useReadCareloOwner = () => {
    const web3 = useEagerWeb3RPC()

    const readCareloOwner = useCallback(async () => {
        try {
            if (!web3.active) {
                return Promise.reject("You are not connected to the RPC node")
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3.library)
            const ownerAddress = await careloRegistrar.owner()
            const ownerName = await web3.library.lookupAddress(ownerAddress)
            return ownerName ? ownerName : ownerAddress

        } catch (error) {
            console.error(error);
            return Promise.reject("Unknown error occurred while trying to reach RPC Node")
        }
    }, [web3.active, web3.library])

    return {
        readCareloOwner,
    };
};
