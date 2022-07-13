import { expect } from "chai";
import { BigNumberish } from "ethers";
import { BytesLike, namehash } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { deployCareloRegistrar } from "../scripts/careloRegistrar";
import { deployENSRegistry, deployResolver, setupResolver } from "../scripts/ens_base_public";
import { getAccounts, labelhash, ZERO_ADDRESS, ZERO_HASH } from "../scripts/utils";
import { CareloRegistrar, ENSRegistry, PublicResolver } from "../typechain";

describe("Carelo - custom Registrar / Resolver contract", function () {
    let ens: ENSRegistry;
    let resolver: PublicResolver
    let careloRegistrar: CareloRegistrar
    beforeEach(async () => {
        ens = await deployENSRegistry()
        resolver = await deployResolver(ens)
        careloRegistrar = await deployCareloRegistrar(ens, "test", resolver);
        await setupResolver(ens, resolver)
        await (await ens.setOwner(ZERO_HASH, ZERO_ADDRESS)).wait() //check if this has impact
        // ens.setSubnodeOwner("te")

    })

    const registerEntity = async (labelHash: BigNumberish, account: string, nameHash: BytesLike, contentHash: BytesLike, URL: string) => {
        const contract = careloRegistrar.connect(await ethers.getSigner(account))
        await (await contract.registerEntity(labelHash, contentHash, URL)).wait
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


        const ensOwner_actual = await ens.owner(ZERO_HASH)
        const registrarOwner_actual = await careloRegistrar.owner()
        const registrarTldOwner_actual = await ens.owner(namehash("test"))
        const registrarController_actual = "0x0"
        const registrarResolver_actual = await ens.resolver(namehash("test"))
        const registrarAddress_actual = await resolver["addr(bytes32)"](namehash("test"))
        const resolverTldOwner_actual = await ens.owner(namehash("resolver"))
        const resolverAddress_actual = await resolver["addr(bytes32)"](namehash("resolver"))
        const resolverResolver_actual = await ens.resolver(namehash("resolver"))

        expect(ensOwner_actual).to.equal(ensOwner_expected)
        // expect(registrarOwner_actual).to.equal(registrarOwner_expected)
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
            newContentHash: await careloRegistrar.contenthash(expected.nameHash)
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
