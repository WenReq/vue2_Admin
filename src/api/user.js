import { httpGet, httpPost } from './request'

export function reguser(data) {
  return httpPost('/api/reguser', data)
}

export function login(data) {
  return httpPost('/api/login', data)
}

export function userinfo(data={}) {
  return httpGet('/my/userinfo', data)
}

export function updateUserInfo(data, config) {
  return httpPost('/my/updateUserInfo', data, config)
}
