import axios, { AxiosRequestConfig } from "axios";

const domain = 'http://localhost:3000';

const config: AxiosRequestConfig = {
  baseURL: domain
};

const httpClient = axios.create(config);

export default httpClient;
