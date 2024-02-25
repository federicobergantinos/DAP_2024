const {
  createRecipe,
  getRecipes,
  getRecipe,
  searchRecipes,
} = require("../services/recipeService");
const { findUserById } = require("../services/userService");
const { isFavorite } = require("../services/favoriteService");

const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const uploadBase64ImageToS3 = async (base64Image, filename) => {
  // Corrige la expresión regular para eliminar correctamente el prefijo de la cadena base64
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Asignar un tipo de contenido correcto o asumir jpeg como predeterminado
  const contentType =
    base64Image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}_${filename}`,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location; // Retorna la URL del archivo cargado
  } catch (error) {
    console.error("Error al cargar la imagen a S3:", error);
    throw error;
  }
};

const { v4: uuidv4 } = require("uuid");

const create = async (req, res) => {
  try {
    let imageUrls = [];
    if (req.body.images && req.body.images.length) {
      // Iterar sobre todas las imágenes en el array y cargarlas a S3
      const uploadPromises = req.body.images.map(async (imageBase64, index) => {
        const filename = `${uuidv4()}_${index}.jpeg`; // Asegurar un nombre de archivo único para cada imagen
        return uploadBase64ImageToS3(imageBase64, filename);
      });
      imageUrls = await Promise.all(uploadPromises); // Esperar a que todas las promesas se resuelvan
    }
    const recipeData = {
      ...req.body,
      imageUrls: imageUrls, // Guardar el array de URLs de las imágenes
    };

    const recipeId = await createRecipe(recipeData); // Asegúrate de que `createRecipe` maneje correctamente `imageUrls`

    res.status(201).json({
      id: recipeId,
      message: "Receta creada con éxito",
      imageUrls: imageUrls, // Devolver las URLs de las imágenes cargadas
    });
  } catch (error) {
    console.error(`Error en la creación de la receta: ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "Ha ocurrido una excepción",
    });
  }
};

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 0; // Asegúrate de proporcionar un valor por defecto
  const limit = parseInt(req.query.limit) || 20; // Límite de ítems por página
  const offset = page * limit;
  const tag = req.query.tag;

  try {
    // Ajusta getRecipes para aceptar un parámetro de tag y lo usa para filtrar las recetas
    const recipes = await getRecipes({ limit, offset, tag }); // Asegúrate de que getRecipes maneje el parámetro de tag adecuadamente
    const response = recipes.map((recipe) => {
      const { id, title, media, tags } = recipe;

      const filteredMedia = media.filter((m) => m.type === "image");
      const firstImage = filteredMedia.length > 0 ? filteredMedia[0].data : "";

      // Mapea los tags a la forma deseada, por ejemplo, un arreglo de nombres de tags
      const tagsArray = tags.map((tag) => tag.key);

      return {
        id,
        title,
        media: firstImage, // Solo devuelve la primera imagen filtrada
        tags: tagsArray, // Incluye los tags asociados
      };
    });
    res.status(200).json(response);
  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has occurred",
    });
  }
};

const searchAll = async (req, res) => {
  const searchTerm = req.query.searchTerm || "";
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 50;
  const offset = page * limit;

  try {
    const recipes = await searchRecipes({ searchTerm, limit, offset });
    res.status(200).json(recipes);
  } catch (error) {
    console.error(`searchRecipes: ${error}`);
    res.status(500).json({
      msg: "An exception has occurred",
    });
  }
};

const getById = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await getRecipe(recipeId);
    const user = await findUserById(recipe.userId);
    const isValidFavorite = await isFavorite(user.id, recipeId);
    recipe.username = user.name + " " + user.surname;
    recipe.userImage = user.photoUrl;
    const data = recipe.media.map((m) => m.data);
    res.status(200).json({
      ...recipe,
      username: user.name + " " + user.surname,
      userImage: user.photoUrl,
      media: data,
      isFavorite: isValidFavorite,
    });
  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  searchAll,
};
