import axios from 'axios';
import { AUTH_RefreshTOKEN } from './AUTH_TOKEN';
import axiosInstance from './axiosInstance';
import toast from 'react-hot-toast';

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
  let toastDisplayed = false;

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      const status = error.response.status;

      if (status === 401) {
        try {
          const response = await axiosRefreshTokenInstance.get(
            `/users/refresh`
          );
          localStorage.setItem('accessToken', response.data.accessToken);

          toastDisplayed = false;

          originalConfig.headers[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`;

          window.location.reload();

          return axiosInstance(originalConfig);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('id');

          if (!toastDisplayed) {
            toast('안전한 서비스 이용을 위해 다시 로그인이 필요합니다.', {
              icon: '🔒',
              duration: 2000,
            });
            toastDisplayed = true; // 토스트 메시지가 표시되었음을 나타냄
          }

          window.location.replace('/#/login');

          console.error(
            '토큰 갱신 요청에서 오류가 발생했습니다:',
            refreshError
          );

          throw refreshError;
        }
      }
      return Promise.reject(error);
    }
  );

  return <></>;
}
