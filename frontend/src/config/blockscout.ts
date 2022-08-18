export const getBlockscoutConnectionDetails = (host: string) => {
    return connectionDetails[host]
}

const connectionDetails = {
    "localhost": { url: process.env.REACT_APP_LOCAL_BLOCKSCOUT_BASE_URL ?? 'http://localhost:4000' },
    "app.carelo.eu": { url: process.env.REACT_APP_HOSTED_BLOCKSCOUT_BASE_URL }
}