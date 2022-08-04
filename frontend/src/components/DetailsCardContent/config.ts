export interface DetailsCardConfigItem {
    listedProperties: string[],
    listedRelationships: string[]

}

export const detailsCardConfig: { [type: string]: DetailsCardConfigItem } = {
    "Asset": {
        listedProperties: [
            "id",
            "type",
            "name",
            "alternateName",
            "category",
            "description",
            "dateCreated",
            "dateModified",
            "dataProvider",
            "owner",
            "source",
            "seeAlso"],
        listedRelationships: ["producedVia", "consumedVia"]
    },
    "Claim": {
        listedProperties: [
            "id",
            "type",
            "name",
            "category",
            "description",

            "solidCarbonContent",
            "carbonFootprint",
            "location",

            "alternateName",
            "dateCreated",
            "dateModified",
            "dataProvider",
            "owner",
            "source",
            "seeAlso"
        ],
        listedRelationships: [
            "refersTo"
        ]
    },
    "Attestation": {
        listedProperties: [
            "id",
            "type",
            "name",
            "category",
            "description",

            "alternateName",
            "dateCreated",
            "dateModified",
            "dataProvider",
            "owner",
            "source",
            "seeAlso"
        ],
        listedRelationships: [
        ]
    }
}