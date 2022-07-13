import { deployCareloRegistrar } from "./careloRegistrar";
import { deployENSRegistry, deployResolver, setupResolver } from "./ens_base_public";
import { ZERO_ADDRESS, ZERO_HASH } from "./utils";

async function main() {
    const ens = await deployENSRegistry()
    const resolver = await deployResolver(ens)
    const careloRegistrar = await deployCareloRegistrar(ens, "carelo", resolver);
    await setupResolver(ens, resolver)
    await (await ens.setOwner(ZERO_HASH, ZERO_ADDRESS)).wait()
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });