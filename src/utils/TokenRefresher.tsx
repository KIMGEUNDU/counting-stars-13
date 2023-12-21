import axios from 'axios';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AUTH_RefreshTOKEN } from './AUTH_TOKEN';
import axiosInstance from './axiosInstance';

const axiosRefreshTokenInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  headers: {
    Authorization: '',
  },
});

axiosRefreshTokenInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${AUTH_RefreshTOKEN()}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default function TokenRefresher() {
  // const navigate = useNavigate();

  useEffect(() => {
    // const refreshAPI = axios.create({
    //   baseURL: import.meta.env.VITE_API_SERVER,
    //   headers: {
    //     Authorization: '',
    //     'Content-type': 'application/json',
    //   },
    // });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalConfig = error.config;
        const status = error.response.status;

        if (status === 401) {
          const response = await axiosRefreshTokenInstance.get(
            `/users/refresh`
          );

          localStorage.setItem('accessToken', response.data.accessToken);

          originalConfig.headers['Authorization'] =
            'Bearer' + response.data.accessToken;
          window.location.reload();
          return axiosInstance(originalConfig);
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return <></>;
}
