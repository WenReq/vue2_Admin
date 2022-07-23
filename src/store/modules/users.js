// 用户模块
import { login } from '@/api/user'
// 路由模块的数组
import sysMenu from '../../router/asyncRouter'

// 初始化 state
const state = () => {
  accessToken: ''
  userMenu: []
  selectMenu: []
  tabsState: {
    tabsMenuList: []
    tabsMenuValue: '/home'
  }
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
  },
  setSelectMenu(state, selectMenu) {
    state.selectMenu = selectMenu
  },
  setTabsState(state, tabs) {
    state.tabsState = tabs
  }
}

// actions
const actions = {
  getToken({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then((res) => {
        if (res.status === 0) {
          const menu = [...sysMenu]
          const item = sysMenu[0]
          const defaultTabsMenus = {
            tabsMenuList: [
              { close: false, icon: 'el-icon-s-home', title: item.meta.title, path: item.path }
            ],
            tabsMenuValue: '/home'
          }
          localStorage.setItem('USER_NAME', userInfo.get('username'))
          localStorage.setItem('ACCESS_TOKEN', res.token)
          localStorage.setItem('USER_MENU', JSON.stringify(menu))
          localStorage.setItem('TABS_STATE', JSON.stringify(defaultTabsMenus))
          commit('setToken', res.token)
          commit('setMenu', menu)
          commit('setSelectMenu', [{ index: item.index, title: item.meta.title, path: item.path }])
          commit('setTabsState', defaultTabsMenus)
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
