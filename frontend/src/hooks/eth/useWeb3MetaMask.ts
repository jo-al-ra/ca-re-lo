import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useSnackbar } from 'notistack';
import { CareloRegistrar__factory } from 'src/typechain';

export const useWeb3MetaMask = () => {
    const web3WithWallet = useWeb3React<Web3Provider>("withWallet")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    //TODO store userInfo in Context
    const [name, setName] = useState("Unnamed User")
    const [avatar, setAvatar] = useState(name)
    const [isCareloController, setIsCareloController] = useState(false)

    const activate = useCallback(async () => {
        try {
            await web3WithWallet.activate(
                new InjectedConnector({ supportedChainIds: [1337] }),
                (error: Error) => {
                    //handle future disruptions
                    enqueueSnackbar(error.message, {
                        variant: "error"
                    })
                    web3WithWallet.deactivate()
                },
                true
            )
            enqueueSnackbar("Connected to Wallet", {
                variant: "success"
            })
        } catch (error: unknown) {
            web3WithWallet.deactivate()
            //handle errors of initial activation
            if (error instanceof Error) {
                enqueueSnackbar(error.message, {
                    variant: "error"
                })
            } else {
                enqueueSnackbar("An unknown error has occured while trying to connect to Wallet", {
                    variant: "error"
                })
            }
            return Promise.reject(error)
        }
    }, [])

    const updateUserInfo = useCallback(async (account) => {
        if (account && web3WithWallet.library) {
            const ensName = await web3WithWallet.library.lookupAddress(account) ?? "Unnamed User"
            setName(ensName)
            setAvatar(await web3WithWallet.library.getAvatar(account) ?? ensName.substring(0, 1))
            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3WithWallet.library)
            setIsCareloController(await careloRegistrar.controllers(account))

        }
    }, [web3WithWallet.library])

    useEffect(() => {
        updateUserInfo(web3WithWallet.account)
    }, [web3WithWallet.account, web3WithWallet.library])

    const deactivate = useCallback(() => {
        try {
            web3WithWallet.deactivate()
            enqueueSnackbar("Disconnected Wallet", {
                variant: "success"
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                enqueueSnackbar(error.message, {
                    variant: "error"
                })
            } else {
                enqueueSnackbar("An unknown error has occured while trying to disconnect Wallet", {
                    variant: "error"
                })
            }
        }
    }, [])

    return {
        ...web3WithWallet,
        activate,
        deactivate,
        name,
        avatar,
        updateUserInfo,
        isCareloController
    };
};
