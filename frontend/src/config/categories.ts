export const categories = {
    "biomass": {
        type: "Asset",
        image: "/static/images/entities/Biomass.jpg",
        categoryName: "Biomass",
        producingActivityCategories: [],
        consumingActivityCategories: ["pyrolysis"]
    },
    "energy": {
        type: "Asset",
        image: "/static/images/entities/Energy.jpg",
        categoryName: "Energy",
        producingActivityCategories: [],
        consumingActivityCategories: ["pyrolysis"]
    },
    "biogas": {
        type: "Asset",
        image: "/static/images/entities/Biogas.jpg",
        categoryName: "Biogas",
        producingActivityCategories: ["pyrolysis"],
        consumingActivityCategories: ["sequestration"]
    },
    "biochar": {
        type: "Asset",
        image: "/static/images/entities/Biochar.jpg",
        categoryName: "Biochar",
        producingActivityCategories: ["pyrolysis"],
        consumingActivityCategories: ["sequestration"]
    },
    "CRC": {
        type: "Asset",
        image: "/static/images/entities/CRC.jpg",
        categoryName: "Carbon Removal Credit (CRC)",
        producingActivityCategories: ["sequestration"],
        consumingActivityCategories: []
    }
}