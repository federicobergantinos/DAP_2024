const recipesData = [
  {
    title: "Paella Vegetariana",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://s3.abcstatics.com/media/gurmesevilla/2012/01/comida-rapida-casera.jpg",
    tags: ["VEGAN", "ANTI_INFLAMMATORY"],
    userId: 1,
  },
  {
    title: "Tacos Veganos de Jackfruit",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image: "https://static-cse.canva.com/blob/598703/Fotografiadecomida.jpg",
    tags: ["VEGAN", "GLUTEN_FREE"],
    userId: 2,
  },
  {
    title: "Café de Cebada con Especias",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.recetasnestle.com.ar/sites/default/files/2022-06/ingredientes-comida-de-mar-parrilla.jpg",
    tags: ["IMMUNE_SYSTEM", "ANTI_INFLAMMATORY"],
    userId: 2,
  },
  {
    title: "Ensalada Mediterránea con Quinoa",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.elmueble.com/medio/2023/05/23/tacos_fcb4f631_00541381_230523124558_1500x2032.jpg",
    tags: ["LOW_CARB", "BAJA_SODIO"],
    userId: 2,
  },
  {
    title: "Bowl de Açaí y Frutas",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://cdn.aarp.net/content/dam/aarp/health/caregiving/2018/03/1140-nutrients-food-loved-ones-caregiving-esp.jpg",
    tags: ["IMMUNE_SYSTEM", "VEGETARIAN"],
    userId: 2,
  },
  {
    title: "Helado de Aguacate y Coco",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGTV9ptpoJ1nv8SE8QJ_A4-pCjnd46axWiA&usqp=CAU",
    tags: ["GLUTEN_FREE", "INTESTINAL_FLORA"],
    userId: 2,
  },
  {
    title: "Sopa de Maní Tradicional",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.laylita.com/recetas/wp-content/uploads/2023/08/Receta-de-la-sopa-de-mani.jpg",
    tags: ["VEGETARIAN", "RAPID_PREPARATION"],
    userId: 2,
  },
  {
    title: "Carne Asada con Chimichurri",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://img.freepik.com/foto-gratis/primer-plano-carne-asada-salsa-verduras-patatas-fritas-plato-sobre-mesa_181624-35847.jpg",
    tags: ["VEGAN", "GLUTEN_FREE"],
    userId: 2,
  },
  {
    title: "Gazpacho Andaluz Refrescante",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_wulETjl6TbYZ3Z4M088Gn3BDvEPhVmYiTQ&usqp=CAU",
    tags: ["IMMUNE_SYSTEM", "INTESTINAL_FLORA"],
    userId: 2,
  },
  {
    title: "Curry Vegano de Lentejas",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4FR8wrs9_0hB3XpxnrggBXRjt1D6F2cLOqQ&usqp=CAU",
    tags: ["ANTI_INFLAMMATORY", "LOW_CARB"],
    userId: 2,
  },
  {
    title: "Tortilla Española Clásica",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.recetasnestle.com.co/sites/default/files/inline-images/comidas-fritas-plato-apanado-ensalada.jpg",
    tags: ["BAJA_SODIO", "VEGETARIAN"],
    userId: 2,
  },
  {
    title: "Empanadas de Carne Cortada a Cuchillo",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.gastronomiaycia.com/wp-content/uploads/2021/01/elplatoharvard_2-680x448.jpg",
    tags: ["RAPID_PREPARATION", "VEGAN"],
    userId: 2,
  },
  {
    title: "Ceviche Peruano de Pescado",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://img.europapress.es/fotoweb/fotonoticia_20180117114451_1200.jpg",
    tags: ["GLUTEN_FREE", "IMMUNE_SYSTEM"],
    userId: 2,
  },
  {
    title: "Pollo al Horno con Hierbas",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrgUcf2pA82UbEWGZy53h2SblBfjuh7HbSidmopFmeV8vxEGZmZWSJZ1YmcxNZN_Hdz9M&usqp=CAU",
    tags: ["INTESTINAL_FLORA", "ANTI_INFLAMMATORY"],
    userId: 2,
  },
  {
    title: "Risotto de Setas Silvestres",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/04/Recetas-de-comidas-para-ni%C3%B1os.jpg",
    tags: ["LOW_CARB", "BAJA_SODIO"],
    userId: 2,
  },
  {
    title: "Crema de Calabaza y Zanahoria",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTm7KZl79yp8Hh8WOP8aRcoTYzaf3_xpXxEA&usqp=CAU",
    tags: ["VEGETARIAN", "RAPID_PREPARATION"],
    userId: 2,
  },
  {
    title: "Chiles en Nogada Estilo Gourmet",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLWNBIqTtuhQjtMtQZ0JZYECLVb0f4JokSg&usqp=CAU",
    tags: ["RAPID_PREPARATION", "LOW_CARB"],
    userId: 2,
  },
  {
    title: "Bacalao a la Vizcaína Tradicional",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdG8lMjBkZSUyMGNvbWlkYXxlbnwwfHwwfHx8MA%3D%3D",
    tags: ["RAPID_PREPARATION", "GLUTEN_FREE"],
    userId: 2,
  },
  {
    title: "Salpicón de Marisco Fresco",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://cdn.pixabay.com/photo/2018/05/21/22/52/gourmet-food-3419926_1280.jpg",
    tags: ["LOW_CARB", "LOW_SODIUM"],
    userId: 2,
  },
  {
    title: "Tarta de Santiago Almendrada",
    description: "description",
    preparationTime: "preparationTime",
    servingCount: 1,
    ingredients: "ingredients",
    steps: "steps",
    calories: 10,
    totalFats: 1.0,
    proteins: 1.0,
    image:
      "https://aprende.com/wp-content/uploads/2021/12/clases-online-de-chef.jpg",
    tags: ["ANTI_INFLAMMATORY", "RAPID_PREPARATION"],
    userId: 2,
  },
];

module.exports = { recipesData };