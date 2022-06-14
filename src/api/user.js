import { httpGet, httpPost } from './request'

export function reguser(data) {
  return httpPost('/api/reguser', data)
}

export function login(data) {
  return httpPost('/api/login', data)
}
