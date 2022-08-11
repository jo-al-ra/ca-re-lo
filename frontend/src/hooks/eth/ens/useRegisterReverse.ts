import { useState } from 'react';
import { useWeb3MetaMask } from '../useWeb3MetaMask';
import { CareloRegistrar__factory } from 'src/typechain';
import { ethers } from 'ethers';

export const useRegisterReverse = () => {
    const [loading, setLoading] = useState(false);
    const web3WithWallet = useWeb3MetaMask();

    const registerAddress = async (name: string) => {
        setLoading(true);
        try {
            if (!web3WithWallet.active) {
                return Promise.reject(new Error("You have to log in first"))
            }
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3WithWallet.library.getSigner())
            const registerNameTx = await careloRegistrar.registerAddress(
                ethers.utils.id(name),
                "resolver",
                "addr.reverse",
                `${name}.carelo`)
            const registerNameReceipt = await registerNameTx.wait()

            return registerNameReceipt
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Unknown error occurred while trying to reach RPC Node"))
        }
    }

    return {
        loading,
        registerAddress,
    };
};
