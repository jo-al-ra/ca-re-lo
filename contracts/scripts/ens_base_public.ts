import { ethers } from "hardhat";
import { BaseRegistrarImplementation, ENSRegistry, PublicResolver } from "../typechain";
import { getAccounts, labelhash, namehash, ZERO_ADDRESS, ZERO_HASH } from "./utils";

export const deployENSRegistry = async () => {
    const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
    const ens = await ENSRegistry.deploy()
    await ens.deployed()
    console.log("ENS deployed to:", ens.address);
    return ens;
}

export const deployResolver = async (ens: ENSRegistry) => {
    const PublicResolver = await ethers.getContractFactory("PublicResolver")
    const resolver = await PublicResolver.deploy(ens.address, ZERO_ADDRESS);
    await resolver.deployed()
    console.log("PublicResolver deployed to:", resolver.address);
    console.log(`params for deployment are "${ens.address}" "${ZERO_ADDRESS}"`)
    return resolver
}

export const setupResolver = async (ens: ENSRegistry, resolver: PublicResolver) => {
    const resolverNode = namehash("resolver");
    const resolverLabel = labelhash("resolver");
    await (await ens.setSubnodeRecord(ZERO_HASH, resolverLabel, (await getAccounts())[0], resolver.address, 0)).wait
    await (await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address)).wait
    await (await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, resolver.address)).wait
    console.log("registered PublicResolver 'resolver' in ENS")
}

export const deployRegistrar = async (ens: ENSRegistry, tld: string) => {
    const BaseRegistrar = await ethers.getContractFactory("BaseRegistrarImplementation")
    const baseRegistrar = await BaseRegistrar.deploy(ens.address, namehash(tld));
    await baseRegistrar.deployed()
    console.log("BaseRegistrar deployed to:", baseRegistrar.address);
    return baseRegistrar
}

export const setupRegistrar = async (ens: ENSRegistry, registrar: BaseRegistrarImplementation, tld: string, resolver: PublicResolver) => {
    await (await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), (await getAccounts())[0])).wait();
    await (await ens.setResolver(namehash(tld), resolver.address)).wait;
    await (await resolver["setAddr(bytes32,address)"](namehash(tld), registrar.address)).wait();
    await (await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address)).wait();
    await (await registrar.addController((await getAccounts())[0])).wait()
    await (await registrar.renounceOwnership()).wait()
    console.log(`registered BaseRegistrar '${tld}' in ENS`)
}