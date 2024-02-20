import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createAuthDTO, Credentials } from "./authDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecipeDTO } from "./RecipeDTO";
import { RecipesDTO } from "./RecipesDTO";
import { RecipesSearchDTO } from "./RecipesSearchDTO";

const olympusApi = axios.create({ baseURL: "https://yummly-elb.federicobergantinos.com:443" });
const recipeBaseUrl = "/v1/recipes";
const usersBaseUrl = "/v1/users";

olympusApi.interceptors.request.use(
  (config) => {
    return getAuthHeader(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);

const responseBodyWithStatusCode = (response: AxiosResponse) => ({
  response: response.data,
  statusCode: response.status,
});
olympusApi.interceptors.response.use((response) => response);

const requests = {
  get: (url: string) => olympusApi.get(url).then(responseBodyWithStatusCode),
  post: (url: string, body?: any) =>
    olympusApi.post(url, body).then(responseBodyWithStatusCode),
  put: (url: string, body?: any) =>
    olympusApi.put(url, body).then(responseBodyWithStatusCode),
  delete: (url: string) =>
    olympusApi.delete(url).then(responseBodyWithStatusCode),
};

const authUser = {
    authenticate: (auth: createAuthDTO): Promise<{ response: Credentials; statusCode: number }> => requests.post('/v1/auth', auth),
    refresh: (refreshToken: string): Promise<{ response: Credentials; statusCode: number }> => requests.put('/v1/auth', {refreshToken: refreshToken})
};

const recipesGateway = {
  createRecipe: async (recipeData) => {
    try {
      console.log(recipeData)
      const url = `${recipeBaseUrl}` + "/create"
      const response = await requests.post(url, recipeData);

      return response;
    } catch (error) {
      console.error('Error al crear la receta:', error);
      throw error;
    }
  },

  getRecipeById: (
    id: number,
  ): Promise<{ response: RecipeDTO; statusCode: number }> =>
    requests.get(recipeBaseUrl + "/" + id),

  getAll: (
    page = 0,
    tag,
  ): Promise<{ response: RecipesDTO; statusCode: number }> => {
    const url = tag
      ? `${recipeBaseUrl}/?page=${page}&limit=10&tag=${tag}`
      : `${recipeBaseUrl}/?page=${page}&limit=10`;
    return requests.get(url);
  },
  searchRecipes: (
    searchTerm = "",
    page = 0,
    limit = 10,
  ): Promise<{ response: RecipesSearchDTO; statusCode: number }> => {
    const url = `${recipeBaseUrl}/search?page=${page}&limit=${limit}&searchTerm=${searchTerm}`;
    return requests.get(url);
  }
};

const users = {
  like: (
    userId: number,
    recipeId: number,
  ): Promise<{ response: any; statusCode: number }> =>
    requests.post(usersBaseUrl + "/" + userId + "/favorites", {
      recipeId: recipeId,
    }),
  dislike: (
    userId: number,
    recipeId: number,
  ): Promise<{ response: any; statusCode: number }> =>
    requests.delete(usersBaseUrl + "/" + userId + "/favorites/" + recipeId),
};

const getAuthHeader = async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};

const getToken = async (): Promise<string> => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token || "";
  } catch (error) {
    console.error("Error al obtener el token:", error);
    return "";
  }
};
export default { authUser, recipesGateway, users };
