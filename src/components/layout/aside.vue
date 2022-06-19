<template>
  <div class="menu" v-bind:class="isCollapse ? 'collapse' : 'no-collapse'">
    <div class="logo flx-center">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span v-show="!isCollapse">Vue2 Admin</span>
    </div>
    <div class="scollbar">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#bdbdc0"
        @select="handleSelect"
      >
        <div v-for="item in userMenu" v-bind:key="item.name">
          <!-- 二级菜单 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title" v-show="!isCollapse">{{ item.meta.title }}</span>
            </template>
            <span v-for="childIt in item.children" :key="childIt.name">
              <el-menu-item v-if="childIt.path" :index="childIt.index">
                <i :class="childIt.meta.icon"></i>
                <span slot="title">{{ childIt.meta.title }}</span>
              </el-menu-item>
            </span>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item :index="item.index" v-else>
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      flatMenus: []
    }
  },
  props: [
    'isCollapse'
  ],
  computed: {
    userMenu () {
      return this.$store.state.users.userMenu
    }
  },
  created: function () {
    this.load()
  },
  methods: {
    load () {
      this.handleFlatMenu()
    },
    handleFlatMenu () {
      this.flatMenus = this.handleMenus()
    },
    // 选中菜单处理
    handleSelect (key, keyPath) {
      // 选择的菜单是多级嵌套还是单级的形式
      const single = keyPath.length === 1 && this.flatMenus.find(it => it.index === keyPath.join())
      const path = keyPath.length > 1 ? this.handleMoreItem(keyPath) : single.path
      // 将选中的菜单项存储起来，用于面包屑的展示和刷新后的重新选中。
      const selectMenu = this.handleSelectMenu(keyPath)
      localStorage.setItem('SELECT_MENU', JSON.stringify(selectMenu))
      this.$store.commit('users/setSelectMenu', selectMenu)
      // TODO: 临时解决 vuex 数据不是响应式的问题
      this.$emit('selectMenuItem', selectMenu)
      // 跳转对应的路由
      this.$router.push({
        path
      })
    },
    // 将菜单平铺处理
    handleMenus () {
      const arr = this.userMenu
      const newArr = []
      function filter (list) {
        for (let i = 0; i < list.length; i++) {
          newArr.push(list[i])
          if (list[i].children && list[i].children.length) {
            filter(list[i].children)
          }
        }
      }
      filter(arr)
      return newArr
    },
    // 处理多级菜单嵌套的路径拼接
    handleMoreItem (list) {
      let path = ''
      list.forEach((ele, idx) => {
        const select = this.flatMenus.find(it => it.index === ele)
        path += idx === 0 ? select.path : `/${select.path}`
      });
      return path
    },
    // 存储选中的菜单信息到 vuex 中
    handleSelectMenu (list) {
      let selectArr = []
      // 单层级的菜单
      if (list.length === 1) {
        const { path, index, meta } = this.flatMenus.find(it => it.index === list.join())
        const item = { path, index, title: meta.title, }
        selectArr.push(item)
        return selectArr
      }
      // 多层级的菜单
      list.forEach((ele, idx) => {
        let { path, index, meta } = this.flatMenus.find(it => it.index === ele)
        path = idx === 0 ? path : `/${path}`
        const item = { path, index, title: meta.title, }
        selectArr.push(item)
      });
      return selectArr
    }
  },
}
</script>

<style lang="less" scoped>
.menu {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #191a20;
  transition: all 0.3s ease;
  .logo {
    box-sizing: border-box;
    height: 55px;
    border-bottom: 1px solid #282a35;
    box-shadow: 2px 0 6px #00152959;
    img {
      width: 30px;
      object-fit: contain;
      margin-right: 8px;
    }
    span {
      font-size: 22px;
      font-weight: 700;
      color: #dadada;
      white-space: nowrap;
    }
  }
  .flx-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scollbar {
    /deep/ .el-menu {
      border: none;
      background-color: #191a20;
      .el-menu-item .is-active {
        color: #409eff;
        background-color: #060708;
        &:before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          content: '';
          background: #409eff;
        }
      }
      .el-submenu__title:hover {
        background-color: #191a20;
      }
      .el-menu-item .is-active,
      .el-menu-item:focus,
      .el-menu-item:hover {
        outline: 0;
        background-color: #060708;
      }
    }
  }
}
.collapse {
  width: 65px;
}
.no-collapse {
  width: 220px;
}
</style>

<style lang="less">
.el-menu--vertical .el-menu {
  background-color: #191a20;
  .el-menu-item.is-active {
    color: #409eff;
    background-color: #060708;
    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 4px;
      content: '';
      background: #409eff;
    }
  }
  .el-submenu__title:hover {
    background-color: #191a20;
  }
  .el-menu-item.is-active,
  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    background-color: #060708;
  }
}
</style>