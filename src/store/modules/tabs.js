import { HOME_URL, TABS_BLACK_LIST } from '@/config/config'
import router from '@/router/index';

export const tabs = {
  state: {
    tabsMenuValue: HOME_URL,
    tabsMenuList: [{ title: "首页", path: HOME_URL, icon: "home-filled", close: false }]
  },
  mutations: {
    // 设置选中 tabs 中的值
    setTabsMenuValue (state, val) {
      state.tabsMenuValue = val;
    },
    // 给 tabsList 添加一项
    addTabsMenuList (state, val) {
      state.tabsMenuList.push(val);
    },
  },
  actions: {
    // 添加 tabs
    addTabs ({ commit, state }, tabItem) {
      // 不添加 tabs 黑名单
      if (TABS_BLACK_LIST.includes(tabItem.path)) return;
      const tabInfo = {
        title: tabItem.title,
        path: tabItem.path,
        close: tabItem.close,
      };
      // 如果打开的 tabs list 中没有这个 item，则添加到 list 中。（用 path 判断）
      if (state.tabsMenuList.every(item => item.path !== tabInfo.path)) {
        commit('addTabsMenuList', tabInfo);
      }
      // 设置新添加的菜单项为选中的 tab
      commit('setTabsMenuValue', tabInfo.path);
      // 路由跳转到新添加的菜单路由
      router.push(tabInfo.path);
    },
    // 移除 tabs
    removeTabs ({ commit, state }, toPath) {
      let tabsMenuValue = state.tabsMenuValue;
      const tabsMenuList = state.tabsMenuList;
      // 关闭当前选中的 tab；tab 选中的值变更为下一个list当前的 tab，或上一个。
      if (toPath === tabsMenuValue) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== toPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          tabsMenuValue = nextTab.path;
          router.push(nextTab.path);
        })
      }
    }
  }
}
