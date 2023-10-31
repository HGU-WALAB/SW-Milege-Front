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

export function getCookie(name) {
  const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
}

export function setServerSideCookie(context) {
  let { cookie } = context.req.headers;

  cookie = cookie ? cookie.split('=')[1] : '';

  if (cookie !== '') {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${cookie}`;
  }
}
