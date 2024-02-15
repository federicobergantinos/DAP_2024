import axios, { AxiosResponse } from 'axios';
import {createAuthDTO, Credentials} from "./authDTO";

const olympusApi = axios.create({ baseURL: "http://192.168.0.5:8080" });

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

export default { authUser };
