import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { NetworkConnector } from '@web3-react/network-connector';
import { JsonRpcProvider } from '@ethersproject/providers';

export const useEagerWeb3RPC = () => {
    const web3RPC = useWeb3React<JsonRpcProvider>()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (!web3RPC.active) {
            web3RPC.activate(new NetworkConnector({ urls: { 1337: "http://localhost:8545" } }))
                .then(() => {
                    enqueueSnackbar("Connected to DLT in read-mode")
                })
                .catch(ex => {
                    console.log(ex)
                });
        }
    }, [web3RPC.active, web3RPC.activate, enqueueSnackbar])

    return {
        ...web3RPC
    };
};
