
export const normalize = (data: any, relationshipKeys: string[]) => {

    let normalizedEntity = {};

    Object.keys(data).forEach(key => {
        if (key === "id" || key === "type") {
            normalizedEntity[`${key}`] = data[`${key}`]
        } else if (relationshipKeys.includes(key)) {
            normalizedEntity[`${key}`] = {
                type: "Relationship",
                object: data[`${key}`]
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
