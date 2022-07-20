
import * as jsonld from "jsonld";
import { ethers } from "ethers"


export const normalized2keyValues = (normalizedEntity) => {
    let keyValuesEntity = {}
    for (let key in normalizedEntity) {
        console.log(normalizedEntity[key])
        try {
            const value = normalizedEntity[key]["value"]
            const object = normalizedEntity[key]["object"]
            if (value !== undefined) {
                keyValuesEntity[key] = value
            } else if (object !== undefined) {
                keyValuesEntity[key] = object
            }
            else {
                keyValuesEntity[key] = normalizedEntity[key]
            }
        } catch (e) {
            console.error(e)
        }
    }
    return keyValuesEntity
}

export const keyValues2contenthash = async (keyValuesEntity, context) => {
    console.log(keyValuesEntity)
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