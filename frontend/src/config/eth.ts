export const getEthConnectionDetails = (host: string) => {
    return connectionDetails[host]
}

const connectionDetails = {
    "localhost": { chainId: Number(process.env.REACT_APP_LOCAL_CHAIN_ID) ?? 1337, rpcURL: process.env.REACT_APP_LOCAL_RPC_URL ?? "http://localhost:8545" },
    "app.carelo.eu": { chainId: Number(process.env.REACT_APP_HOSTED_CHAIN_ID) ?? 1337, rpcURL: process.env.REACT_APP_HOSTED_RPC_URL }
}