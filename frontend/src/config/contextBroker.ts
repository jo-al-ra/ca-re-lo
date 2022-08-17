export const getContextBrokerConnectionDetails = (host: string) => {
    return connectionDetails[host]
}

const connectionDetails = {
    "localhost": { url: process.env.REACT_APP_LOCAL_CONTEXT_BROKER_BASE_URL ?? 'http://localhost/orion/ngsi-ld/v1' },
    "app.carelo.eu": { url: process.env.REACT_APP_HOSTED_CONTEXT_BROKER_BASE_URL }
}