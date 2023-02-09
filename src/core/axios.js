/*
 * @Description: Axios 的封装
 * @Author: wen
 * @Date: 2022-06-14 20:44:31
 * @LastEditors: wen
 * @LastEditTime: 2022-06-14 22:50:49
 */
import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_API;

const config = {
  baseURL: baseURL,
  timeout: 1000 * 60 * 3, // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('vuex') &&
      JSON.parse(localStorage.getItem('vuex')).users.accessToken;
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] =
    //   'application/x-www-form-urlencoded; charset=UTF-8';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (response) => {
    const { status, message } = response.data;
    if (status === 0 || status === 200) {
      return Promise.resolve(response);
    }
    return message && Promise.reject(message);
  },
  (error) => {
    return Promise.reject(error.response.data.data);
  },
);

export default _axios;
