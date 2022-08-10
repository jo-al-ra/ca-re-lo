import { useCallback } from 'react';
import { CareloRegistrar__factory } from 'src/typechain';
import { useEagerWeb3RPC } from '../useEagerWeb3RPC';
import { namehash } from 'ethers/lib/utils';

export const useFindLatestContenthashTx = () => {
    const web3 = useEagerWeb3RPC()

    const findTx = useCallback(async (id: string) => {
        try {
            if (!web3.active) {
                return Promise.reject(new Error("You are not connected to the RPC node"))
            }

            const ensNode = namehash(`${id}.carelo`)

            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3.library)

            const filterContenthashChanged = careloRegistrar.filters.ContenthashChanged(ensNode)
            const logs = await careloRegistrar.queryFilter(filterContenthashChanged)

            const newest = logs.reduce((prev, current) => {
                return !current.removed && current.blockNumber >= prev.blockNumber ? current : prev
            })
            const contenthash = await careloRegistrar.contenthash(ensNode)
            const txHash = newest.transactionHash
            const txReceipt = await newest.getTransactionReceipt()
            const dataProviderAddress = txReceipt.from
            const dataProviderName = await web3.library.lookupAddress(dataProviderAddress)
            return {
                contenthash: contenthash,
                txHash: txHash,
                ensNode: ensNode,
                dataProvider: dataProviderName ?? dataProviderAddress
            }

        } catch (error) {
            console.error(error);
            return Promise.reject(new Error("Unknown error occurred while trying to reach RPC Node"))
        }
    }, [web3.active, web3.library])

    return {
        findTx,
    };
};
