const { Tag } = require("../../../entities/associateModels");

const populateTags = async () => {
    const tags = [
        {title: 'All', key: "ALL"},
        {title: 'Vegetariana', key: "VEGETARIANA"},
        {title: 'Rapida Preparacion', key: "RAPIDA_PREPARACION"},
        {title: 'Vegana', key: "VEGANA"},
        {title: 'Aptas celiacas', key: "APTAS_CELIACAS"},
        {title: 'Sistema inmune', key: "SISTEMAS_INMUNE"},
        {title: 'Flora intestinal', key: "FLORA_INTESTINAL"},
        {title: 'Antiinflamatoria', key: "ANTIINFLAMATORIA"},
        {title: 'Baja en carbohidratos', key: "BAJA_CARBOHIDRATOS"},
        {title: 'Baja en sodio', key: "BAJA_SODIO"}
    ];

    try {
        const tagsExist = await Tag.count();
        if (tagsExist === 0) {
            await Tag.bulkCreate(tags);
            console.log("Tags table has been populated with initial data.");
        } else {
            console.log("Tags table is already populated.");
        }
    } catch (error) {
        console.error("Error populating Tags table:", error);
    }
};

module.exports = populateTags;
