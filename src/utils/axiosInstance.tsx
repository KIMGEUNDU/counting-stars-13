import axios from 'axios';
import { AUTH_TOKEN } from './AUTH_TOKEN';

const axiosInstance = axios.create({
  baseURL: 'https://localhost/api',
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

export default axiosInstance;
