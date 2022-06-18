<template>
  <div class="menu" v-bind:class="isCollapse ? 'collapse' : 'no-collapse'">
    <div class="logo flx-center">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span v-if="!isCollapse">Vue2 Admin</span>
    </div>
    <div class="scollbar">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        text-color="#bdbdc0"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            <span slot="title">选项1</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  props: [
    'isCollapse'
  ]
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