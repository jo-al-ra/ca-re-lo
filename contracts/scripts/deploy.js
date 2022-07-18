const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "carelo";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";

async function main() {
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
  // const FIFSRegistrar = await ethers.getContractFactory("FIFSRegistrar")
  const BaseRegistrar = await ethers.getContractFactory("BaseRegistrarImplementation")
  const PublicResolver = await ethers.getContractFactory("PublicResolver")
  const signers = await ethers.getSigners();
  const accounts = signers.map(s => s.address)

  const ens = await ENSRegistry.deploy()
  await ens.deployed()
  console.log("ENS deployed to:", ens.address);
  const resolver = await PublicResolver.deploy(ens.address, ZERO_ADDRESS);
  await resolver.deployed()
  console.log("PublicResolver deployed to:", resolver.address);
  await setupResolver(ens, resolver, accounts)
  // const registrar = await FIFSRegistrar.deploy(ens.address, namehash.hash("fifs"));
  // await registrar.deployed()
  // console.log("FIFSRegistrar deployed to:", registrar.address);
  // await setupRegistrar(ens, registrar, "fifs");
  const baseRegistrar = await BaseRegistrar.deploy(ens.address, namehash.hash(tld));
  await baseRegistrar.deployed()
  console.log("BaseRegistrar deployed to:", baseRegistrar.address);
  await setupRegistrar(ens, baseRegistrar, tld, resolver);
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = labelhash("resolver");
  await ens.setSubnodeOwner(ZERO_HASH, resolverLabel, accounts[0]);
  await ens.setResolver(resolverNode, resolver.address);
  await resolver['setAddr(bytes32,address)'](resolverNode, resolver.address);
}

async function setupRegistrar(ens, registrar, tld, resolver) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address);
  await ens.setResolver(namehash.hash(tld), resolver.address);
  await resolver['setAddr(bytes32,address)'](namehash.hash(tld), registrar.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });