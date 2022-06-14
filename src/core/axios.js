// import Vue from "vue";
import axios from "axios";
// import router from "@/router";

const baseURL = process.env.VUE_APP_HOST

const config = {
  baseURL: baseURL,
  timeout: 1000 * 60 * 3 // Timeout
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  (config) => {
    // debugger
    // const token = localStorage.getItem('ACCESS_TOKEN')
    // if (token) {
    //   config.headers['authorization'] = token
    // }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    debugger
    const {
      status,
      message
    } = response.data
    if (status === 0) {
      return Promise.resolve(response)
    }
    return message && Promise.reject(message)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default _axios