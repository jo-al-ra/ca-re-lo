import { ethers } from "hardhat";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const namehash = ethers.utils.namehash
export const labelhash = ethers.utils.id


export const getAccounts = async () => (await ethers.getSigners()).map(s => s.address)