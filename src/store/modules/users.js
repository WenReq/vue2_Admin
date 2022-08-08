// 用户模块
import { login } from '@/api/user'

// state
const state = () => {
  accessToken: ''
}

// getters
const getters = {}

// mutations
const mutations = {
  setToken(state, token) {
    state.accessToken = token
  },
}

// actions
const actions = {
  getToken({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((res) => {
        if (res.status === 0) {
          localStorage.setItem('ACCESS_TOKEN', res.token)
          commit('setToken', res.token)
        }
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
