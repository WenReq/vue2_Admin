import _axios from '@/core/axios'
import {
  Message
} from 'element-ui'

export function httpGet(url, params) {
  return new Promise((resolve, reject) => {
    _axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      console.warn(err, 'WARN')
      reject(err)
    })
  })
}

export function httpPost(url, params, config) {
  return new Promise((resolve, reject) => {
    _axios.post(url, params, {
      headers: {
        'Content-Type': (config && config['Content-Type']) || 'application/json;charset=utf-8'
      }
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (err === undefined || err.__CANCEL__) {
          return false
        }
        Message.error({
          type: 'error',
          message: err
        })
        reject(err)
      })
  })
}