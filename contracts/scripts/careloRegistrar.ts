import { ethers } from "hardhat";
import { ENSRegistry, PublicResolver } from "../typechain";
import { getAccounts, labelhash, namehash, ZERO_HASH } from "./utils";

export const deployCareloRegistrar = async (ens: ENSRegistry, tld: string, resolver: PublicResolver) => {
    const owner = (await getAccounts())[0]
    const CareloRegistrar = await ethers.getContractFactory("CareloRegistrar")
    const careloRegistrar = await CareloRegistrar.deploy(ens.address, namehash(tld))
    await careloRegistrar.deployed()

    await (await ens.setSubnodeRecord(ZERO_HASH, labelhash(tld), owner, resolver.address, 0)).wait
    await (await resolver["setAddr(bytes32,address)"](namehash(tld), careloRegistrar.address)).wait();
    await (await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), careloRegistrar.address)).wait();
    await (await careloRegistrar.addController((await getAccounts())[0])).wait()
    // await (await careloRegistrar.renounceOwnership()).wait()
    console.log(`registered CareloRegistrar '${tld}' in ENS with address ${careloRegistrar.address}`)

    return careloRegistrar
}