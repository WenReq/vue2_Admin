<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
    <div class="logo flx-center">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span v-show="!isCollapse">Vue2 Admin</span>
    </div>
    <div class="scoll-bar">
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :router="true"
        :collapse-transition="false"
				:unique-opened="true"
        background-color="#191a20"
				text-color="#bdbdc0"
				active-text-color="#fff"
      >
        <!-- 菜单不能正常收缩。因为子组件中添加了div标签，把ul中的li元素外添加了div -->
        <!-- <SubItem :menuList="menuList"></SubItem> -->
        <template v-for="(subItem, index) in menuList">
          <el-submenu :key="subItem.path" v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
            <template #title>
              <i class="iconfont" :class="subItem.meta.icon"></i>
              <span class="menu-name">{{ subItem.meta.title }}</span>
            </template>
            <SubItem :menuList="subItem.children"></SubItem>
          </el-submenu>
          <el-menu-item :key="index" v-else :index="subItem.path">
            <i class="iconfont" :class="subItem.meta.icon"></i>
            <span class="menu-name">{{ subItem.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import SubItem from './components/SubItem'
import asyncRouter from '@/router/asyncRouter'

export default {
  name: 'Aside',
  components: { SubItem },
  data () {
    return {

    }
  },
  computed: {
    isCollapse () {
      return this.$store.state.menus.isCollapse
    },
    activeMenu () {
      return this.$route.path
    },
    menuList () {
      return this.$store.state.menus.menuList
    },
  },
  mounted () {
    const vm = this
    window.onresize = () => {
      vm.listeningWindow()
    }
    this.handleSetMenuList()
  },
  methods: {
    listeningWindow() {
      const screenWidth = document.body.clientWidth;
      if (this.isCollapse === false && screenWidth < 1200) this.$store.commit('setCollapse');
      if (this.isCollapse === true && screenWidth > 1200) this.$store.commit('setCollapse');
    },
    handleSetMenuList() {
      // 如果是动态获取的路由，需要调接口后设置。this.$store.commit('setMenuList', res.data);
      // 目前本项目是静态的路由
      this.$store.commit('setMenuList', asyncRouter);
    },
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
  .scoll-bar {
    :deep(.el-menu) {
      border: none;
      background-color: #191a20;
      .el-menu-item.is-active {
        color: #409eff !important;
        background-color: #060708 !important;
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
      .el-sub-menu .el-menu-item {
        height: 50px;
        line-height: 50px;
      }
      .menu-name {
        margin-left: 7px;
      }
    }
  }
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