# ca-re-lo
Distributed Ledgers as Shared Audit Trails for Carbon Removal (Carbon Removal Log)


# Deployment

## Building images for each component

### Smart Contracts

A container to deploy the smart contracts on a local node with hardhat can be built using the following script. For other deployment options, refer to the documentation in the component folder.

```
docker image build -t ens:0.0.1 ./contracts
```

### NGINX Proxy

Cors is not supported by the orion-LD Context Broker. A simple nginx proxy can be used to enable cors

```
docker image build -t nginx-reverse-proxy:0.0.1 ./nginx
```

### Frontend

TBD

## Start containers

### Backend

The backend consists of a local ganache test node and an orion-ld context broker.

Set up .env according to env.example before executing the script.

```
./startup.sh
```

### Blockscout

Blockscout is an open source block explorer. The frontend will link to blockscout to enable users to verify transactions and events related to the displayed entities.

```
docker compose -f ./it/docker-compose/blockscout.yml up -d
```

### Frontend

TBD

## Verify Smart Contracts

The bytecode of the deployed Smart Contracts should be verified to enable transactions and events to be decoded in blockscout.

Please set up the variables before executing the script:

```
./verifyContracts.sh
```