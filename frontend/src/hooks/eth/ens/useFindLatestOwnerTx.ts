import { useCallback } from 'react';
import { CareloRegistrar__factory } from 'src/typechain';
import { useEagerWeb3RPC } from '../useEagerWeb3RPC';
import { namehash } from 'ethers/lib/utils';
import { ethers } from 'ethers';

export const useFindLatestOwnerTx = () => {
    const web3 = useEagerWeb3RPC()

    const findTx = useCallback(async (id: string) => {
        try {
            if (!web3.active) {
                return Promise.reject(new Error("You are not connected to the RPC node"))
            }

            const ensNode = namehash(`${id}.carelo`)
            const tokenId = ethers.BigNumber.from(ethers.utils.id(id))

            const careloRegistrar = CareloRegistrar__factory.connect("carelo", web3.library)

            //eithe use "Transfer" from ERC721 or "NewOwner" from ENS
            const filterTransfer = careloRegistrar.filters.Transfer(undefined, undefined, tokenId)
            const logs = await careloRegistrar.queryFilter(filterTransfer)

            const newest = logs.reduce((prev, current) => {
                return !current.removed && current.blockNumber >= prev.blockNumber ? current : prev
            })
            const owner = await careloRegistrar.ownerOf(tokenId)
            const ownerName = await web3.library.lookupAddress(owner)
            const txHash = newest.transactionHash
            return {
                ownerAddress: owner,
                ownerName: ownerName,
                txHash: txHash,
                ensNode: ensNode,
                tokenId: tokenId
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
