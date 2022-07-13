import { useCallback } from 'react';
import { ethers } from "ethers"
import { CareloRegistrar__factory } from 'src/typechain';
import { useEagerWeb3RPC } from '../useEagerWeb3RPC';

export const useReadContentHash = () => {
    const web3 = useEagerWeb3RPC()

    const readContenthash = useCallback(async (id: string) => {
        try {
            if (!web3.active) {
                return Promise.reject("You are not connected to the RPC node")
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3.library)
            return careloRegistrar.contenthash(ethers.utils.namehash(`${id}.carelo`))

        } catch (error) {
            console.log(error);
            return Promise.reject("Unknown error occurred while trying to reach RPC Node")
        }
    }, [web3.active, web3.library])

    return {
        readContenthash,
    };
};
