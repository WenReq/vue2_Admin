import { httpGet, httpPost } from './request'

export function cates(data) {
  return httpGet('/my/articleCate/cates', data)
}

export function addCates(data) {
  return httpPost('/my/articleCate/addCates', data)
}

export function deletecate(data) {
  return httpGet('/my/articleCate/deletecate/' + data.id, data)
}