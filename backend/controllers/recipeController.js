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
  // Eliminar el prefijo de la cadena base64 si está presente
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  // Asignar un tipo de contenido basado en el prefijo de la cadena base64 o asumir jpeg como predeterminado
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
    let imageUrl = null;
    if (req.body.image) {
      // Generar un nombre de archivo único utilizando UUID
      const filename = `${uuidv4()}.jpeg`;
      imageUrl = await uploadBase64ImageToS3(req.body.image, filename);
    }

    const recipeData = {
      ...req.body,
      imageUrl: imageUrl,
    };

    console.log(recipeData);
    const recipeId = await createRecipe(recipeData);

    res.status(201).json({
      id: recipeId,
      message: "Receta creada con éxito",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error(` ${error}`);
    res.status(error.code || 500).json({
      msg: error.message || "An exception has ocurred",
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

      // Selecciona la primera imagen de media, si existe
      const firstImage = media.length > 0 ? media[0].data : "";

      // Mapea los tags a la forma deseada, por ejemplo, un arreglo de nombres de tags
      const tagsArray = tags.map((tag) => tag.key);

      return {
        id,
        title,
        media: firstImage, // Solo devuelve la primera imagen
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
