import { accessToken } from 'mapbox-gl';
import axiosInstance from 'src/utils/axios';

export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function setServerSideCookie(context) {
  let { cookie } = context.req.headers;

  cookie = getKeyFromPairString(cookie, 'accessToken');

  if (cookie !== '') {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${cookie}`;
  }
}

export function getKeyFromPairString(pairString, key) {
  const pairArr = pairString.split(';').map((pair) => pair.trim());

  // eslint-disable-next-line no-restricted-syntax
  for (const pair of pairArr) {
    const [pairKey, pairValue] = pair.split('=').map((c) => c.trim());

    if (pairKey === key) {
      return pairValue;
    }
  }

  return '';
}

export function getCookie(key) {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  console.log(cookies);
  // eslint-disable-next-line no-restricted-syntax
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (cookieKey === key) {
      console.log(cookieValue);
      return cookieValue;
    }
  }
  return null;
}
