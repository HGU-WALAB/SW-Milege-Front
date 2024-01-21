// routes
import { useCallback } from 'react';
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';
import { deleteCookie, getCookie, removeCookie, setCookie } from './jwtCookie';
import axiosInstance from '../utils/axios';
import { DOMAIN } from 'src/components/common/Appbar/MileageHeader';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

function jwtDecode(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');

    localStorage.removeItem('accessToken');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    setCookie('accessToken', accessToken, 1);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    deleteCookie('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// LOGIN
export const login = async (loginData) => {
  const response = await axiosInstance
    .post('/api/admin/login', loginData)
    .catch((error) => alert('아이디 혹은 비밀번호가 일치하지 않습니다.'));
  const { token } = response.data;

  await setSession(token);

  await alert('로그인 되었습니다.');
  window.location.href = `${DOMAIN}/`;
};
// LOGOUT
export const logout = async () => {
  await setSession(null);
  await alert('로그아웃 되었습니다.');
  window.location.href = `${DOMAIN}${DOMAIN}/auth/login`;
};

export const handleServerAuth403Error = async (errorMessage) => {
  await setSession(null);
  window.location.href = await `${DOMAIN}${DOMAIN}/auth/login`;
  alert(errorMessage);
};

export const getSession = () => getCookie('accessToken') !== null;
