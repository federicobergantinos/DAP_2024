import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAuthDTO, Credentials } from "./authDTO";
import { RecipeDTO } from "./RecipeDTO";
import { RecipesDTO } from "./RecipesDTO";
import { RecipesSearchDTO } from "./RecipesSearchDTO";

// Establecer la URL base del servidor
const api = axios.create({ baseURL: "http://192.168.0.100:8080" });

// Definir las URLs base para las rutas de recetas y usuarios
const recipeBaseUrl = "/v1/recipes";
const usersBaseUrl = "/v1/users";

// Interceptores de solicitud y respuesta
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return getAuthHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      return { response: error.response.data, status: error.response.statusCode };
    }
    return Promise.reject(error);
  }
);

// Función para agregar el código de estado a la respuesta
const responseBodyWithStatusCode = (response: AxiosResponse): { response: any, statusCode: any } => ({
  response: response.data,
  statusCode: response.status,
});

api.interceptors.response.use((response) => response);

// Definición de funciones de solicitud HTTP
const requests = {
  get: (url: string) => api.get(url).then(responseBodyWithStatusCode),
  post: (url: string, body?: any) =>
    api.post(url, body).then(responseBodyWithStatusCode),
  put: (url: string, body?: any) =>
    api.put(url, body).then(responseBodyWithStatusCode),
  delete: (url: string) =>
    api.delete(url).then(responseBodyWithStatusCode),
};

// Objeto para funciones relacionadas con la autenticación
const authUser = {
  authenticate: (auth: createAuthDTO): Promise<{ response: any; statusCode: number }> =>
    requests.post('/v1/auth', auth),
  refresh: (refreshToken: string): Promise<{ response: Credentials; statusCode: number }> =>
    requests.put('/v1/auth', { refreshToken: refreshToken })
};

// Objeto para funciones relacionadas con recetas
const recipesGateway = {
  createRecipe: async (recipeData) => {
    try {
      const url = `${recipeBaseUrl}` + "/create"
      const response = await requests.post(url, recipeData);
      return response;
    } catch (error) {
      console.error('Error al crear la receta:', error);
      throw error;
    }
  },

  getRecipeById: (id: number): Promise<{ response: RecipeDTO; statusCode: number }> =>
    requests.get(recipeBaseUrl + "/" + id),

  getAll: (page = 0, tag, userId=""): Promise<{ response: RecipesDTO; statusCode: number }> => {
    const url = tag
      ? `${recipeBaseUrl}/?page=${page}&limit=10&tag=${tag}&userId=${userId}`
      : `${recipeBaseUrl}/?page=${page}&limit=10&userId=${userId}` ;  
    return requests.get(url);
  },

  searchRecipes: (searchTerm = "", page = 0, limit = 10): Promise<{ response: RecipesSearchDTO; statusCode: number }> => {
    const url = `${recipeBaseUrl}/search?page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
    return requests.get(url);
  }
};

// Objeto para funciones relacionadas con usuarios
const users = {
  like: (userId: number, recipeId: number): Promise<{ response: any; statusCode: number }> =>
    requests.post(usersBaseUrl + "/" + userId + "/favorites", {
      recipeId: recipeId,
    }),
  dislike: (userId: number, recipeId: number): Promise<{ response: any; statusCode: number }> =>
    requests.delete(usersBaseUrl + "/" + userId + "/favorites/" + recipeId),
  favorites: (userId: number): Promise<{ response: any; statusCode: number  }> => 
    requests.get(usersBaseUrl + "/" + userId + "/favorites"),
  };

// Función para obtener el encabezado de autenticación
const getAuthHeader = async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};

// Función para obtener el token de autenticación del almacenamiento local
const getToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return "";
  }
};


// Exportar los objetos y funciones definidos
export default {
  authUser,
  recipesGateway,
  users,
};
