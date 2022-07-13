import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useSnackbar } from 'notistack';

export const useWeb3MetaMask = () => {
    const web3WithWallet = useWeb3React<Web3Provider>("withWallet")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
        deactivate
    };
};
