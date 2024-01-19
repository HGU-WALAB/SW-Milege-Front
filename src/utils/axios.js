import axios from 'axios';
import { HOST_API_KEY } from '../config-global';
import { getCookie, removeCookie } from 'src/auth/jwtCookie';
import { useAuthContext } from 'src/auth/useAuthContext';
import { handleServerAuth403Error, setSession } from 'src/auth/utils';
import { DOMAIN } from 'src/components/common/Appbar/MileageHeader';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  config.withCredentials = true; // withCredentials 옵션 추가

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버에서 보내는 에러 응답

    const serverErrorMessage = error.response?.data?.message;

    // 만약 서버에서 에러 메시지가 있으면 그 메시지를 보여주고, 아니면 기본 메시지를 보여줍니다.
    const errorMessageToShow = serverErrorMessage || 'Something went wrong';

    if (typeof window !== 'undefined') {
      if (errorMessageToShow !== 'Something went wrong') alert(errorMessageToShow);
      else {
        console.error(errorMessageToShow);
      }
    }

    // 동일한 메시지로 reject
    return Promise.reject(error);
  }
);

export default axiosInstance;
