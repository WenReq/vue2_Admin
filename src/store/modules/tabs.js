import { HOME_URL, TABS_BLACK_LIST } from '@/config/config'
import router from '@/router/index';

export const tabs = {
  state: {
    tabsMenuValue: HOME_URL,
    tabsMenuList: [{ title: "首页", path: HOME_URL, icon: "el-icon-s-home", close: false }]
  },
  mutations: {
    // 设置选中的 tab
    setTabsMenuValue (state, val) {
      state.tabsMenuValue = val
    },
    // 添加一个 tab
    addTabsMenuList (state, val) {
      state.tabsMenuList.push(val)
    },
    // 设置 tabs 集合
    setTabsMenuList (state, val) {
      state.tabsMenuList = val
    },
  },
  actions: {
    // 添加一个 tab
    addTabs ({ commit, state }, tabItem) {
      // 不添加 tabs 黑名单
      if (TABS_BLACK_LIST.includes(tabItem.path)) return
      const tabInfo = {
        title: tabItem.title,
        path: tabItem.path,
        close: tabItem.close,
      };
      // 如果打开的 tabs list 中没有这个 item，则添加到 list 中。（用 path 判断）
      if (state.tabsMenuList.every(item => item.path !== tabInfo.path) && tabInfo.path !== '/home/index') {
        commit('addTabsMenuList', tabInfo)
      }
      // 设置新添加的菜单项为选中的 tab
      commit('setTabsMenuValue', tabInfo.path)
      // 路由跳转到新添加的菜单路由
      router.push(tabInfo.path)
    },
    // 移除一个 tab
    removeTabs ({ commit, state }, tabPath) {
      let tabsMenuValue = state.tabsMenuValue
      const tabsMenuList = state.tabsMenuList
      // 关闭当前选中的 tab；tab 选中的值变更为下一个list当前的 tab，或上一个。
      if (tabPath === tabsMenuValue) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1]
          if (!nextTab) return
          tabsMenuValue = nextTab.path
          router.push(nextTab.path)
        })
      }
      // 将处理后的值再次赋值
      commit('setTabsMenuValue', tabsMenuValue)
      commit('setTabsMenuList', tabsMenuList.filter(item => item.path !== tabPath))
    },
    // 移除多个 tab
    closeMultipleTabs ({ commit, state }, tabPath) {
      commit('setTabsMenuList', state.tabsMenuList.filter(item => {
        return item.path === tabPath || item.path === HOME_URL
      }))
    },
    // 跳转首页
    goHome ({ commit }) {
      router.push(HOME_URL)
      commit('setTabsMenuValue', HOME_URL)
    },
  }
}
