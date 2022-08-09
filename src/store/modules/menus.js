export const menus = {
  state: {
    // 菜单收缩状态
    isCollapse: false,
    // 菜单集合
    menuList: [],
  },
  mutations: {
    setCollapse(state) {
      state.isCollapse = !state.isCollapse;
    },
    setMenuList(state, menuList) {
      state.menuList = menuList
    }
  },
  actions: {},
}