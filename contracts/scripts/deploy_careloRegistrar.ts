import { deployCareloRegistrar } from "./careloRegistrar";
import { deployENSRegistry, deployResolver, setupResolver } from "./ens_base_public";
import { deployReverseRegistrar } from "./reverseRegistrar";
import { ZERO_ADDRESS, ZERO_HASH } from "./utils";

async function main() {
    const ens = await deployENSRegistry()
    const resolver = await deployResolver(ens)
    const reverseRegistrar = await deployReverseRegistrar(ens, resolver)
    const careloRegistrar = await deployCareloRegistrar(ens, "carelo", resolver, reverseRegistrar);
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