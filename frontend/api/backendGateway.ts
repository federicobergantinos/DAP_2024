import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {createAuthDTO, Credentials} from "./authDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {RecipeDTO} from "./RecipeDTO";

const olympusApi = axios.create({ baseURL: "http://192.168.0.5:8080" });
const recipeBaseUrl = "/v1/recipes"

olympusApi.interceptors.request.use((config) => {
    return getAuthHeader(config)
}, (error) => {
    return Promise.reject(error);
});

const getAuthHeader = async (config) => {
    const token = await getToken()
    if (token) {
        config.headers.Authorization = token;
    }
    return config
}
const getToken = async (): Promise<string> => {
    try {
        const token = await AsyncStorage.getItem("token");
        return token || "";
    } catch (error) {
        console.error("Error al obtener el token:", error);
        return "";
    }
}

const responseBodyWithStatusCode = (response: AxiosResponse) => ({
    response: response.data,
    statusCode: response.status
});
olympusApi.interceptors.response.use((response) => response);

const requests = {
    get: (url: string) => olympusApi.get(url).then(responseBodyWithStatusCode),
    post: (url: string, body?: any) => olympusApi.post(url, body).then(responseBodyWithStatusCode),
    put: (url: string, body?: any) => olympusApi.put(url, body).then(responseBodyWithStatusCode),
    delete: (url: string) => olympusApi.delete(url).then(responseBodyWithStatusCode),
};

const authUser = {
    authenticate: (auth: createAuthDTO): Promise<{ response: Credentials; statusCode: number }> => requests.post('/v1/auth', auth)
};

const recipesGateway = {
    getRecipeById:(id: number): Promise<{ response: RecipeDTO; statusCode: number }> => requests.get(recipeBaseUrl + '/' + id)
}

export default { authUser, recipesGateway };
