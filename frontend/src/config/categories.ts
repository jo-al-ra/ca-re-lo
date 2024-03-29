export const categories = {
    "biomass": {
        type: "Asset",
        image: "/static/images/entities/Biomass.jpg",
        categoryName: "Biomass",
        producingActivityCategories: [],
        consumingActivityCategories: ["pyrolysis"],
        description: 'Biochar is a solid material created via a thermochemical conversion of biomass with limited presence of oxygen. It can be used as a renewable fuel or to sequester carbon.'
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
        image: "/static/images/entities/Biochar_2.jpg",
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
    },
    "sequestration": {
        image: "https://images.pexels.com/photos/1238864/pexels-photo-1238864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    "pyrolysis": {
        image: "https://images.pexels.com/photos/2253595/pexels-photo-2253595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
}