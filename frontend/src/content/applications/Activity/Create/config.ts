export const getActivityCategories: () => ActivityCategory[] = () => [
    {
        name: "pyrolysis",
        inputs: [
            { type: "Asset", category: "biomass" },
            { type: "Asset", category: "energy" }
        ],
        outputs: [
            {
                type: "Asset",
                category: "biogas",
                defaultValues: {
                    name: "Biogas #xxx",
                    alternateName: "Biogas #xxx",
                    category: "biogas",
                    id: `urn:ngsi-ld:asset:biogas${Date.now()}`
                }
            },
            {
                type: "Asset",
                category: "biochar",
                defaultValues: {
                    name: "Biochar #xxx",
                    alternateName: "Biokohle #xxx",
                    category: "biochar",
                    id: `urn:ngsi-ld:asset:biochar${Date.now()}`
                }
            }
        ]
    },
    {
        name: "sequestration",
        inputs: [
            { type: "Asset", category: "biochar" },
        ],
        outputs: [
            {
                type: "Asset",
                category: "CRC",
                defaultValues: {
                    name: "CRC #xxx",
                    alternateName: "CRC #xxx",
                    category: "CRC",
                    id: `urn:ngsi-ld:asset:crc${Date.now()}`
                }
            }
        ]

    }
]

export interface ActivityCategory {
    name: string;
    inputs: {
        type: string;
        category: string;
    }[];
    outputs: ActivityCategoryOutput[];
}

export interface ActivityCategoryOutput {
    type: string;
    category: string;
    defaultValues?: {
        name: string;
        alternateName: string;
        category: string;
        id: string;
    }
}