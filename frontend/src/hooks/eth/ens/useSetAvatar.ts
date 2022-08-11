import { useCallback, useState } from 'react';
import { useWeb3MetaMask } from '../useWeb3MetaMask';
import { PublicResolver__factory } from 'src/typechain';
import { ethers } from 'ethers';

export const useSetAvatar = () => {
    const [loading, setLoading] = useState(false);
    const web3WithWallet = useWeb3MetaMask();

    const setAvatar = useCallback(async (avatar: string) => {
        setLoading(true);
        try {
            if (!web3WithWallet.active) {
                return Promise.reject(new Error("You have to log in first"))
            }
            if (web3WithWallet.name === "Unnamed User") {
                return Promise.reject(new Error("You have to register a name for your account first"))
            }
            const resolverAddr = (await web3WithWallet.library.getResolver(web3WithWallet.name)).address
            const resolver = PublicResolver__factory.connect(resolverAddr, web3WithWallet.library.getSigner())
            const setTextTx = await resolver.setText(ethers.utils.namehash(web3WithWallet.name), "avatar", avatar)
            const setTextReceipt = await setTextTx.wait()

            return setTextReceipt
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Unknown error occurred while trying to reach RPC Node"))
        }
    }, [web3WithWallet.active, web3WithWallet.library, web3WithWallet.name])

    return {
        loading,
        setAvatar,
    };
};
