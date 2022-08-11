
export const normalize = (data: any, relationshipKeys: string[]) => {

    let normalizedEntity = {};

    Object.keys(data).forEach(key => {
        if (key === "id" || key === "type") {
            normalizedEntity[`${key}`] = data[`${key}`]
        } else if (relationshipKeys.includes(key)) {
            if (Array.isArray(data[key])) {
                //this is an array of relationships
                normalizedEntity[`${key}`] = [
                    ...data[key].map((ref, index) => ({
                        type: "Relationship",
                        object: ref,
                        datasetId: `urn:ngsi-ld:datasetid:${data.id}:${key}${index}`
                    }))
                ]
            } else {
                normalizedEntity[`${key}`] = {
                    type: "Relationship",
                    object: data[`${key}`]
                }
            }
        }
        else {
            normalizedEntity[`${key}`] = {
                type: "Property",
                value: data[`${key}`]
            }
        }
    })

    return normalizedEntity
}
