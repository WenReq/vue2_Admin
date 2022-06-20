import store from '@/store/index'

export default function Initializer() {
  // 因为添加了命名空间（namespaced: true），所以这个的第一个入参为 users/setToken ，命名空间下的函数
  store.commit('users/setToken', localStorage.getItem('ACCESS_TOKEN'))
  store.commit('users/setMenu', JSON.parse(localStorage.getItem('USER_MENU')))
  store.commit('users/setSelectMenu', JSON.parse(localStorage.getItem('SELECT_MENU')))
  store.commit('users/setTabsState', JSON.parse(localStorage.getItem('TABS_STATE')))
}
