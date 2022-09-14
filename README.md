# ca-re-lo
Distributed Ledgers as Shared Audit Trails for Carbon Removal (Carbon Removal Log)

`contracts` contains the used smart contracts maintained in a [hardhat](https://hardhat.org/) project

`data models` contains the used data models and context files designed following the guidelines for [smart data models](https://smartdatamodels.org/)

`documentation` contains figures

`frontend` contains code for the CaReLo dashboard based on the [Tokyo Free White React Typescript Admin Dashboard](https://tokyo-free-white.bloomui.com/)

`it` contains docker files used and storage locations for docker volumes

`nginx` contains the nginx.conf to add CORS support to the context broker

# Deployment

## Requirements

Docker version 20.10.18, build b40c2f6 or above

## Building images for each component

### Smart Contracts

A container to deploy the smart contracts on a local ganache node with hardhat can be built using the following script. For other deployment options, refer to the documentation in the component folder.

```
docker image build -t ens:0.0.1 ./contracts
```

### NGINX Proxy

Cors is not supported by the orion-LD Context Broker. A simple nginx proxy can be used to enable cors

```
docker image build -t nginx-reverse-proxy:0.0.1 ./nginx
```

### Other components

will be pulled from bulic repos or built upon deployment

## Start containers

### Backend

The backend consists of a local ganache test node, an orion-ld context broker, an nginx proxy, a blockscout instance and associated databases.

All containers can be started using the following command:

```
./startup.sh
```

### Frontend

The frontend can be used to demonstrate some capabilities of this system. Organizations can model the value chain using assets, activities and claims. Third party auditors can create attestations to verify, validate or challenge the correctness. Users can examine the value chain by traversing the entities on the canvas page. 

```
./startupFrontend.sh
```

## Verify Smart Contracts

The bytecode of the deployed Smart Contracts should be verified to enable transactions and events to be decoded in blockscout.

If you are starting with a completely new chain, you do not have to modify the variables and can just run:

### Requirements

npm version 6.13.4 or above
node version 12.14.1 or higher subversion

```
./verifyContracts.sh
```