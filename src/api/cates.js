import { httpGet, httpPost } from './request'

// 文章类别列表
export function cates(data) {
  return httpGet('/my/articleCate/cates', data)
}

// 新增文章类别
export function addCates(data) {
  return httpPost('/my/articleCate/addCates', data)
}

// 删除文章类别
export function deletecate(data) {
  return httpGet('/my/articleCate/deletecate/' + data.Id)
}

// 编辑文章类别
export function updatecate(data) {
  return httpPost('/my/articleCate/updatecate/', data)
}
