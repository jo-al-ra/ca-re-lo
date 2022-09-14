import { expect } from "chai";
import { BigNumberish } from "ethers";
import { BytesLike, namehash, id } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { deployCareloRegistrar } from "../scripts/careloRegistrar";
import { deployENSRegistry, deployResolver, setupResolver } from "../scripts/ens_base_public";
import { deployReverseRegistrar } from "../scripts/reverseRegistrar";
import { getAccounts, labelhash, ZERO_ADDRESS, ZERO_HASH } from "../scripts/utils";
import { CareloRegistrar, ENSRegistry, PublicResolver, ReverseRegistrar } from "../typechain";

describe("Carelo - custom Registrar / Resolver contract", function () {
    let ens: ENSRegistry;
    let resolver: PublicResolver
    let careloRegistrar: CareloRegistrar
    let reverseRegistrar: ReverseRegistrar
    beforeEach(async () => {
        ens = await deployENSRegistry()
        resolver = await deployResolver(ens)
        reverseRegistrar = await deployReverseRegistrar(ens, resolver)
        careloRegistrar = await deployCareloRegistrar(ens, "test", resolver, reverseRegistrar);
        await setupResolver(ens, resolver)
        await (await ens.setOwner(ZERO_HASH, ZERO_ADDRESS)).wait() //check if this has impact
        // ens.setSubnodeOwner("te")

    })

    const registerEntity = async (labelHash: BigNumberish, account: string, nameHash: BytesLike, contentHash: BytesLike, URL: string) => {
        const contract = careloRegistrar.connect(await ethers.getSigner(account))
        const registerTx = await contract.registerEntity(labelHash, contentHash, URL)
        const registerReceipt = await registerTx.wait();
        console.log(registerReceipt.gasUsed)
    }

    it("should lock all contracts after deployment", async () => {
        const ensOwner_expected = ZERO_ADDRESS
        const registrarOwner_expected = ZERO_ADDRESS
        const registrarTldOwner_expected = careloRegistrar.address
        const registrarController_expected = "0x0"
        const registrarResolver_expected = resolver.address
        const registrarAddress_expected = careloRegistrar.address
        const resolverTldOwner_expected = resolver.address
        const resolverAddress_expected = resolver.address
        const resolverResolver_expected = resolver.address
        const reverseRegistrarNodeOwner_expected = reverseRegistrar.address
        const reverseResolver_expected = resolver.address
        const reverseResolvedAddr_expected = reverseRegistrar.address


        const ensOwner_actual = await ens.owner(ZERO_HASH)
        const registrarOwner_actual = await careloRegistrar.owner()
        const registrarTldOwner_actual = await ens.owner(namehash("test"))
        const registrarController_actual = "0x0"
        const registrarResolver_actual = await ens.resolver(namehash("test"))
        const registrarAddress_actual = await resolver["addr(bytes32)"](namehash("test"))
        const resolverTldOwner_actual = await ens.owner(namehash("resolver"))
        const resolverAddress_actual = await resolver["addr(bytes32)"](namehash("resolver"))
        const resolverResolver_actual = await ens.resolver(namehash("resolver"))
        const reverseRegistrarNodeOwner_actual = await ens.owner(namehash("addr.reverse"))
        const reverseResolver_actual = await ens.resolver(namehash("addr.reverse"))
        const reverseResolvedAddr_actual = await resolver["addr(bytes32)"](namehash("addr.reverse"))

        expect(ensOwner_actual).to.equal(ensOwner_expected)
        // expect(registrarOwner_actual).to.equal(registrarOwner_expected)
        expect(registrarTldOwner_actual).to.equal(registrarTldOwner_expected)
        expect(registrarController_actual).to.equal(registrarController_expected)
        expect(registrarResolver_actual).to.equal(registrarResolver_expected)
        expect(registrarAddress_actual).to.equal(registrarAddress_expected)
        expect(resolverTldOwner_actual).to.equal(resolverTldOwner_expected)
        expect(resolverAddress_actual).to.equal(resolverAddress_expected)
        expect(resolverResolver_actual).to.equal(resolverResolver_expected)
        expect(reverseRegistrarNodeOwner_actual).to.equal(reverseRegistrarNodeOwner_expected)
        expect(reverseResolver_actual).to.equal(reverseResolver_expected)
        expect(reverseResolvedAddr_actual).to.equal(reverseResolvedAddr_expected)
    })

    it("Should enable creation of new entities", async function () {
        const expected = await defineExpectedBase()

        await registerEntity(expected.labelHash, expected.accounts[0], expected.nameHash, expected.hashFunc(expected.content), expected.initialURL)

        const url_actual = await careloRegistrar.text(expected.nameHash, "URL")
        const contentHash_actual = await careloRegistrar.contenthash(expected.nameHash)
        const owner_actual = await ens.owner(expected.nameHash)
        const resolverAddress_actual = await ens.resolver(expected.nameHash)

        expect(url_actual).to.equal(expected.initialURL)
        expect(contentHash_actual).to.equal(expected.hashFunc(expected.content))
        expect(owner_actual).to.equal(expected.accounts[0])
        expect(resolverAddress_actual).to.equal(careloRegistrar.address)
    });

    it("Should enable the transfer of entities", async () => {
        const expected = (await defineExpectedBase())
        const newURL = "http://secondOwner.test/entities/id"

        await registerEntity(expected.labelHash, expected.accounts[0], expected.nameHash, expected.hashFunc(expected.content), expected.initialURL)

        const transferTx = await careloRegistrar["transferEntity(address,address,uint256,string)"](expected.accounts[0], expected.accounts[1], expected.labelHash, newURL)
        transferTx.wait()

        const actual = {
            tokenOwner: await careloRegistrar.ownerOf(expected.labelHash),
            nameOwner: await ens.owner(expected.nameHash),
            newURL: await careloRegistrar.text(expected.nameHash, "URL"),
            contentHash: await careloRegistrar.contenthash(expected.nameHash)
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
        await (await careloRegistrar.setContenthash(expected.nameHash, expected.hashFunc(newContent))).wait()

        const actual = {
            newContentHash: await careloRegistrar.contenthash(expected.nameHash),
            newURL: await careloRegistrar.text(expected.nameHash, "url")
        }

        expect(actual.newContentHash).to.equal(expected.hashFunc(newContent))
    })

    it("should enable setting a reverse record", async () => {
        const account = (await getAccounts())[0]
        const expected = {
            nameLabel: "firstaccount",
            canonicalName: "firstaccount.test",
            addressOwner: reverseRegistrar.address,
            reverseNode: namehash(`${account.substring(2)}.addr.reverse`),
            resolver: resolver.address
        }


        await (await careloRegistrar.registerAddress(id(expected.nameLabel), resolver.address, reverseRegistrar.address, expected.canonicalName)).wait()

        const actual = {
            name: await resolver.name(expected.reverseNode),
            addressOwner: await ens.owner(expected.reverseNode),
            address: await resolver["addr(bytes32)"](namehash(expected.canonicalName)),
            nameOwner: await ens.owner(namehash(expected.canonicalName)),
            resolver: await ens.resolver(namehash(expected.canonicalName))
        }

        expect(actual.name).to.equal(expected.canonicalName)
        expect(actual.addressOwner).to.equal(expected.addressOwner)
        expect(actual.address).to.equal(account)
        expect(actual.nameOwner).to.equal(account)
        expect(actual.resolver).to.equal(expected.resolver)
    })

    it("should enable setting a reverse twice", async () => {
        const account = (await getAccounts())[0]
        const expected = {
            nameLabel: "firstaccount",
            canonicalName: "firstaccount.test",
            addressOwner: reverseRegistrar.address,
            reverseNode: namehash(`${account.substring(2)}.addr.reverse`),
            resolver: resolver.address
        }


        await (await careloRegistrar.registerAddress(id("test"), resolver.address, reverseRegistrar.address, "test.test")).wait()
        await (await careloRegistrar.registerAddress(id(expected.nameLabel), resolver.address, reverseRegistrar.address, expected.canonicalName)).wait()

        const actual = {
            name: await resolver.name(expected.reverseNode),
            addressOwner: await ens.owner(expected.reverseNode),
            address: await resolver["addr(bytes32)"](namehash(expected.canonicalName)),
            nameOwner: await ens.owner(namehash(expected.canonicalName)),
            resolver: await ens.resolver(namehash(expected.canonicalName))
        }

        expect(actual.name).to.equal(expected.canonicalName)
        expect(actual.addressOwner).to.equal(expected.addressOwner)
        expect(actual.address).to.equal(account)
        expect(actual.nameOwner).to.equal(account)
        expect(actual.resolver).to.equal(expected.resolver)
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
