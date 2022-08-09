// 用户模块
import { login } from '@/api/user'

export const users = {
  state: {
    accessToken: ''
  },
  mutations: {
    setToken(state, token) {
      state.accessToken = token
    }
  },
  actions: {
    getToken({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res) => {
          if (res.status === 0) {
            commit('setToken', res.token)
          }
          resolve(res)
        })
      })
    }
  }
}
