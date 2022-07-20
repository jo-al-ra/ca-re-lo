import { IncomingRelationshipParameter } from "src/content/applications/Canvas/types"

const generateBaseSchema = (type: string) => ({
    "type": "object",
    "properties":
    {
        "id": {
            "type": "string",
            "format": "uri",
            "description": "Unique identifier of the entity",
            "default": `urn:ngsi-ld:${type}:`
        },
        "name":
        {
            "type": "string",
            "description": "The name of this item."
        },
        "alternateName":
        {
            "type": "string",
            "description": "An alternative name for this item"
        },
        "description":
        {
            "type": "string",
            "description": "A description of this item"
        },
        "seeAlso":
        {
            "type": "array",
            "items": { "type": "string", "format": "uri" },
            "description": "List of uri pointing to additional resources about the item"
        }
    }
})

export interface FormConfigItem {
    relationshipKeys: string[],
    type: string,
    schema: any,
    incomingRelationships: IncomingRelationshipParameter[]
}

export const formConfig: { [type: string]: FormConfigItem } = {
    "Asset": {
        relationshipKeys: ["producedVia", "consumedVia"],
        incomingRelationships: [],
        type: "Asset",
        schema: {
            "$schema": "http://json-schema.org/schema",
            "$schemaVersion": "0.0.1",
            "$id": "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/Asset/schemaManualModified.json",
            "title": "Asset",
            "modelTags": "",
            "description": "Representation of an asset in a supply chain.",
            "type": "object",
            "required": ["id"],
            "allOf": [
                {
                    ...generateBaseSchema("Asset")
                },
                {
                    "properties":
                    {
                        "producedVia":
                        {
                            "type": "string",
                            "format": "uri",
                            "description": "Reference to the entity, that documents the production of this entity"
                        },
                        "consumedVia":
                        {
                            "type": "string",
                            "format": "uri",
                            "description": "Reference to the entity, that documents the consumption of this entity"
                        },
                        "category": {
                            "description": "Category of the Asset.",
                            "type": "string",
                            "enum": [
                                "biochar",
                                "biogas",
                                "biomass",
                                "energy",
                                "CRC"
                            ]
                        },
                        "hasClaims": {
                            "type": "array",
                            "description": "List of claims associated to this asset.",
                            "items": {
                                "anyOf": [
                                    {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "Property. Identifier format of any NGSI entity"
                                    }
                                ]
                            }
                        }
                    }
                }]
        }
    },
    "Activity": {
        relationshipKeys: [],
        incomingRelationships: [
            {
                relationshipName: "producedVia",
                type: "Asset",
                context: "http://context/ngsi-context.jsonld"
            },
            {
                relationshipName: "consumedVia",
                type: "Asset",
                context: "http://context/ngsi-context.jsonld"
            },
        ],
        type: "Activity",
        schema: {
            "$schema": "http://json-schema.org/schema",
            "$schemaVersion": "0.0.1",
            "$id": "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/Activity/schemaManualModified.json",
            "title": "Activity",
            "modelTags": "",
            "description": "Activity performed within a business process to achieve a business goal.",
            "type": "object",
            "required": ["id"],
            "allOf": [
                {
                    ...generateBaseSchema("Activity")
                },
                {
                    "properties":
                    {
                        "produces": {
                            "type": "array",
                            "description": "List of entities consumed via this activity.",
                            "items": {
                                "type": "string",
                                "format": "uri",
                                "description": "Identifier format of any NGSI entity"
                            }
                        },
                        "consumes": {
                            "type": "array",
                            "description": "List of entities created via this activity.",
                            "items": {
                                "type": "string",
                                "format": "uri",
                                "description": "Identifier format of any NGSI entity"
                            }
                        }
                    }
                }
            ]
        }
    },
    "Attestation": {
        relationshipKeys: ["refersTo"],
        type: "Attestation",
        incomingRelationships: [],
        schema: {
            "$schema": "http://json-schema.org/schema",
            "$schemaVersion": "0.0.1",
            "$id": "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/Safeguard/schemaManualModified.json",
            "title": "Attestation",
            "modelTags": "",
            "description": "Attestation to verify, validate and challenge the representation of other entities.",
            "type": "object",
            "required": [
                "id",
                "refersTo",
                "category"
            ],
            "allOf": [
                {
                    ...generateBaseSchema("Attestation")
                },
                {
                    "properties":
                    {
                        "refersTo": {
                            "type": "array",
                            "description": "The refered entities and their contenthash.",
                            "items": {
                                "type": "object",
                                "required": [
                                    "object",
                                    "contenthash"
                                ],
                                "properties": {
                                    "object": {
                                        "type": "string",
                                        "format": "uri",
                                        "description": "Identifier format of any NGSI entity"
                                    },
                                    "contenthash": {
                                        "type": "string",
                                        "description": "Contenthash derived using URDNA2015 on the expanded keyvalues (JSON-LD) object and the solidity keccak256 hash."
                                    }
                                }
                            }
                        },
                        "category": {
                            "type": "string",
                            "enum": [
                                "validation",
                                "verification",
                                "challenge"
                            ],
                            "description": "Category of the attestation"
                        }
                    }
                }
            ]
        }
    },
    "Claim": {
        relationshipKeys: ["refersTo"],
        incomingRelationships: [],
        type: "Claim",
        schema: {
            "$schema": "http://json-schema.org/schema",
            "$schemaVersion": "0.0.1",
            "$id": "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/Claim/schemaManualModified.json",
            "title": "Claim",
            "modelTags": "",
            "description": "Claims issued for other subjects, describing properties of entities and enabling more granular data sharing.",
            "type": "object",
            "required": ["id"],
            "allOf": [
                {
                    ...generateBaseSchema("Claim")
                },
                {
                    "properties":
                    {
                        "solidCarbonContent": {
                            "type": "number",
                            "minimum": 0,
                            "description": "Solid carbon content of the referenced entity in kg."
                        },
                        "carbonFootprint": {
                            "type": "number",
                            "description": "Carbon footprint of the referenced entity in t CO2e."
                        },
                        "isWasteMaterial": {
                            "type": "boolean",
                            "description": "True, if the referenced entity is an unwanted byproduct, which has to be disposed."
                        },
                        "refersTo": {
                            "type": "string",
                            "format": "uri",
                            "description": "Reference to the subject (entity) this claim refers to."
                        }
                    }
                }
            ]
        }
    },
}