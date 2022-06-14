import {
  httpGet,
  httpPost
} from "./request";

export function register(data) {
  return httpPost('/api/register', data)
}

export function login(data) {
  return httpPost('/api/login', data)
}