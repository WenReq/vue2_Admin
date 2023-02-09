import { httpGet, httpPost } from './request';

export function reguser(data) {
  return httpPost('/user/register', data);
}

export function login(data) {
  return httpPost('/auth/login', data);
}

export function userinfo(data = {}) {
  return httpGet('/my/userinfo', data);
}

export function updateUserInfo(data, config) {
  return httpPost('/my/updateUserInfo', data, config);
}

export function updatePwd(data) {
  return httpPost('/my/updatePwd', data);
}

export function updateAvatar(data) {
  return httpPost('/my/update/avatar', data);
}

export function getCode(data) {
  return httpGet('/login/code', data);
}
