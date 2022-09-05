
import * as jsonld from "jsonld";
import { ethers } from "ethers"
import testEntity from "./testEntity.json"


export const normalized2keyValues = (normalizedEntity) => {
    let keyValuesEntity = {}
    for (let key in normalizedEntity) {
        console.log(normalizedEntity[key])
        try {
            const getFlattenedValue = (entityFragment) => {
                const value = entityFragment["value"]
                const object = entityFragment["object"]
                if (value !== undefined) {
                    return value
                } else if (object !== undefined) {
                    return object
                }
                else if (Array.isArray(entityFragment)) {
                    return entityFragment.map(value => {
                        return getFlattenedValue(value)
                    })
                }
                else {
                    return entityFragment
                }
            }
            keyValuesEntity[key] = getFlattenedValue(normalizedEntity[key])
        } catch (e) {
            console.error(e)
        }
    }
    return keyValuesEntity
}

export const normalized2contenthash = async (normalizedEntity, context) => {
    const expanded = await jsonld.expand({ ...testEntity, "@context": [context, "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context-v1.3.jsonld"] })
    console.log(expanded)
    const flattened = await jsonld.flatten(expanded)
    console.log(flattened)
    const canonized = await jsonld.canonize(expanded, {
        algorithm: "URDNA2015",
        format: "application/n-quads"
    })
    console.log(canonized)
    const contentHash = ethers.utils.id(canonized)
    console.log(contentHash)
}

export const keyValues2contenthash = async (keyValuesEntity, context) => {
    const expanded = await jsonld.expand({ ...keyValuesEntity, "@context": context })
    const canonized = await jsonld.canonize(expanded, {
        algorithm: "URDNA2015",
        format: "application/n-quads"
    })
    console.log(canonized)
    const contentHash = ethers.utils.id(canonized)
    console.log(contentHash)
    return contentHash
}