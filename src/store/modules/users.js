// 用户模块
import { login } from '@/api/user'
// 路由模块的数组
import sysMenu from '../../router/asyncRouter'

// 初始化 state
const state = () => {
  accessToken: ''
  userMenu: []
}

// getters
const getters = {}

// mutations
const mutations = {
  setToken(state, token) {
    state.accessToken = token
  },
  setMenu(state, menu) {
    state.userMenu = menu
  }
}

// actions
const actions = {
  getToken({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((res) => {
        if (res.status === 0) {
          const menu = [...sysMenu]
          localStorage.setItem('ACCESS_TOKEN', res.token)
          localStorage.setItem('USER_MENU', JSON.stringify(menu))
          commit('setToken', res.token)
          commit('setMenu', menu)
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
