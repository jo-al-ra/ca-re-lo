import { expect } from "chai";
import { BigNumberish } from "ethers";
import { BytesLike, namehash } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { deployENSRegistry, deployRegistrar, deployResolver, setupRegistrar, setupResolver } from "../scripts/ens_base_public";
import { getAccounts, labelhash, ZERO_ADDRESS, ZERO_HASH } from "../scripts/utils";
import { BaseRegistrarImplementation, ENSRegistry, PublicResolver } from "../typechain";

describe("Carelo - standard components", function () {
  let ens: ENSRegistry;
  let resolver: PublicResolver;
  let registrar: BaseRegistrarImplementation;
  beforeEach(async () => {
    ens = await deployENSRegistry()
    resolver = await deployResolver(ens)
    registrar = await deployRegistrar(ens, "test")
    await setupResolver(ens, resolver)
    await setupRegistrar(ens, registrar, "test", resolver)
    await (await ens.setOwner(ZERO_HASH, ZERO_ADDRESS)).wait() //check if this has impact
    // ens.setSubnodeOwner("te")

  })

  const registerEntity = async (labelHash: BigNumberish, account: string, nameHash: BytesLike, contentHash: BytesLike, URL: string) => {
    await (await registrar.register(labelHash, account, 60 * 60 * 24 * 365 * 100)).wait()
    await (await ens.setResolver(nameHash, resolver.address)).wait()
    await (await resolver.setContenthash(nameHash, contentHash)).wait()
    await (await resolver.setText(nameHash, "URL", URL)).wait()
  }

  it("should lock all contracts after deployment", async () => {
    const ensOwner_expected = ZERO_ADDRESS
    const registrarOwner_expected = ZERO_ADDRESS
    const registrarTldOwner_expected = registrar.address
    const registrarController_expected = "0x0"
    const registrarResolver_expected = resolver.address
    const registrarAddress_expected = registrar.address
    const resolverTldOwner_expected = resolver.address
    const resolverAddress_expected = resolver.address
    const resolverResolver_expected = resolver.address


    const ensOwner_actual = await ens.owner(ZERO_HASH)
    const registrarOwner_actual = await registrar.owner()
    const registrarTldOwner_actual = await ens.owner(namehash("test"))
    const registrarController_actual = "0x0"
    const registrarResolver_actual = await ens.resolver(namehash("test"))
    const registrarAddress_actual = await resolver["addr(bytes32)"](namehash("test"))
    const resolverTldOwner_actual = await ens.owner(namehash("resolver"))
    const resolverAddress_actual = await resolver["addr(bytes32)"](namehash("resolver"))
    const resolverResolver_actual = await ens.resolver(namehash("resolver"))

    expect(ensOwner_actual).to.equal(ensOwner_expected)
    expect(registrarOwner_actual).to.equal(registrarOwner_expected)
    expect(registrarTldOwner_actual).to.equal(registrarTldOwner_expected)
    expect(registrarController_actual).to.equal(registrarController_expected)
    expect(registrarResolver_actual).to.equal(registrarResolver_expected)
    expect(registrarAddress_actual).to.equal(registrarAddress_expected)
    expect(resolverTldOwner_actual).to.equal(resolverTldOwner_expected)
    expect(resolverAddress_actual).to.equal(resolverAddress_expected)
    expect(resolverResolver_actual).to.equal(resolverResolver_expected)
  })

  it("Should enable creation of new entities", async function () {
    const expected = await defineExpectedBase()

    await registerEntity(expected.labelHash, expected.accounts[0], expected.nameHash, expected.hashFunc(expected.content), expected.initialURL)

    const url_actual = await resolver.text(expected.nameHash, "URL")
    const contentHash_actual = await resolver.contenthash(expected.nameHash)
    const owner_actual = await ens.owner(expected.nameHash)
    const resolverAddress_actual = await ens.resolver(expected.nameHash)

    expect(url_actual).to.equal(expected.initialURL)
    expect(contentHash_actual).to.equal(expected.hashFunc(expected.content))
    expect(owner_actual).to.equal(expected.accounts[0])
    expect(resolverAddress_actual).to.equal(resolver.address)
  });

  it("Should enable the transfer of entities", async () => {
    const expected = (await defineExpectedBase())
    const newURL = "http://secondOwner.test/entities/id"
    const resolver_2 = resolver.connect(await ethers.getSigner(expected.accounts[1]))

    await registerEntity(expected.labelHash, expected.accounts[0], expected.nameHash, expected.hashFunc(expected.content), expected.initialURL)
    await (await registrar["safeTransferFrom(address,address,uint256)"](expected.accounts[0], expected.accounts[1], expected.labelHash)).wait()
    await (await ens.setOwner(expected.nameHash, expected.accounts[1])).wait()
    await (await resolver_2.setText(expected.nameHash, "URL", newURL)).wait()

    const actual = {
      tokenOwner: await registrar.ownerOf(expected.labelHash),
      nameOwner: await ens.owner(expected.nameHash),
      newURL: await resolver.text(expected.nameHash, "URL"),
      contentHash: await resolver.contenthash(expected.nameHash)
    }

    expect(actual.tokenOwner).to.equal(expected.accounts[1])
    expect(actual.nameOwner).to.equal(expected.accounts[1])
    expect(actual.newURL).to.equal(newURL)
    expect(actual.contentHash).to.equal(expected.hashFunc(expected.content))
  })

  it("should enable updating the content hash", async () => {
    const expected = (await defineExpectedBase())
    const newContent = "new test content"

    await registerEntity(expected.labelHash, expected.accounts[0], expected.nameHash, expected.hashFunc(expected.content), expected.initialURL)
    await (await resolver.setContenthash(expected.nameHash, expected.hashFunc(newContent))).wait()

    const actual = {
      newContentHash: await resolver.contenthash(expected.nameHash)
    }

    expect(actual.newContentHash).to.equal(expected.hashFunc(newContent))
  })

});

const defineExpectedBase = async () => {
  const expected = {
    accounts: (await getAccounts()),
    label: "urn:ngsi-ld:testentity:1",
    name: "urn:ngsi-ld:testentity:1.test",
    nameHash: namehash("urn:ngsi-ld:testentity:1.test"),
    labelHash: labelhash("urn:ngsi-ld:testentity:1"),
    content: "test content",
    hashFunc: labelhash,
    initialURL: "http://firstOwner.test/entities/urn:ngsi-ld:testentity:1",
  }
  return expected
}
