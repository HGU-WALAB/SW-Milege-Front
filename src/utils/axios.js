import axios from 'axios';
import { HOST_API_KEY } from '../config-global';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버에서 보내는 에러 응답
    const serverErrorMessage = error.response?.data?.message;

    // 만약 서버에서 에러 메시지가 있으면 그 메시지를 보여주고, 아니면 기본 메시지를 보여줍니다.
    const errorMessageToShow = serverErrorMessage || 'Something went wrong';

    // 여기서 alert나 다른 방법으로 errorMessageToShow를 사용자에게 보여줄 수 있습니다.
    alert(errorMessageToShow);

    // 동일한 메시지로 reject
    return Promise.reject(errorMessageToShow);
  }
);

export default axiosInstance;
