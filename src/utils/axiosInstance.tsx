import axios from 'axios';
import { AUTH_TOKEN } from './AUTH_TOKEN';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  headers: {
    Authorization: '',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${AUTH_TOKEN()}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export default axiosInstance;
