import { ethers } from "hardhat";
import { ENSRegistry, PublicResolver } from "../typechain";
import { getAccounts, labelhash, namehash, ZERO_HASH } from "./utils";

export const deployReverseRegistrar = async (ens: ENSRegistry, resolver: PublicResolver) => {
    const ReverseRegistrar = await ethers.getContractFactory("ReverseRegistrar")
    const reverseRegistrar = await ReverseRegistrar.deploy(ens.address, resolver.address)
    await reverseRegistrar.deployed()
    console.log("ReverseRegistrar deployed to:", reverseRegistrar.address);
    console.log(`params for deployment are "${ens.address}" "${resolver.address}"`)
    await (await ens.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), (await getAccounts())[0])).wait();
    await (await ens.setSubnodeRecord(namehash("reverse"), labelhash("addr"), (await getAccounts())[0], resolver.address, 0)).wait();
    await (await resolver["setAddr(bytes32,address)"](namehash("addr.reverse"), reverseRegistrar.address)).wait();
    await (await ens.setSubnodeOwner(namehash("reverse"), labelhash("addr"), reverseRegistrar.address)).wait();
    await (await ens.setSubnodeOwner(ZERO_HASH, labelhash("reverse"), reverseRegistrar.address)).wait();

    return reverseRegistrar;
}