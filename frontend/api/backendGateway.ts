import axios, { AxiosResponse } from 'axios';
import {createAuthDTO} from "./authDTO";

const olympusApi = axios.create({ baseURL: "http://localhost:8080" });

const responseBody = (response: AxiosResponse) => response.data;

olympusApi.interceptors.response.use((response) => response);

const authUser = {
    post: (auth: createAuthDTO) => olympusApi.post('/v1/auth').then(responseBody)
};

export default { authUser };
