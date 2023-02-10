import _axios from '@/core/axios';

// 新增
export function add(data) {
  return _axios({
    url: '/curd',
    method: 'post',
    data,
  });
}

// 查询
export function getData(params) {
  return _axios({
    url: '/curd',
    method: 'get',
    params,
  });
}

// 更新
export function update(data) {
  return _axios({
    url: `/curd/${data.id}`,
    method: 'patch',
    data,
  });
}

// 删除
export function del(data) {
  return _axios({
    url: `/curd/${data.id}`,
    method: 'delete',
  });
}
