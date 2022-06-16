<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header style="height: auto">
          <div class="header">
            <div class="header-lf flx-center">
              <i class="el-icon-s-fold collapse-icon"></i>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-ri flx-center">
              <span class="username"> WenShaoChang </span>
              <el-dropdown trigger="click">
                <div class="avatar">
                  <img src="@/assets/img/avatar.gif" alt="avatar" srcset="" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人资料</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click.native="handleLayout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="tabs-box">
            <div class="tabs-menu">
              <el-tabs
                v-model="tabsMenuValue"
                type="card"
                @tab-click="tabClick"
                @tab-remove="removeTab"
              >
                <el-tab-pane
                  v-for="item in tabsMenuList"
                  :key="item.path"
                  :path="item.path"
                  :label="item.title"
                  :name="item.path"
                  :closable="item.close"
                >
                  <template #label>
                    <i v-if="item.icon" :class="item.icon"></i>
                    {{ item.title }}
                  </template>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main-box">
            <router-view></router-view>
          </div>
        </el-main>
        <div class="footer">
          <a href="https://www.wenreq.site/blog/" target="_blank"
            >2022 © Vue2-Admin By WenShaoChang Technology.</a
          >
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
      tabsMenuValue: '/home',
      tabsMenuList: [
        {
          path: '/home',
          title: '首页',
          close: false,
          icon: 'el-icon-s-home'
        }
      ]
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted () { },
  methods: {
    handleLayout () {
      localStorage.removeItem('ACCESS_TOKEN')
      this.$router.push({
        path: '/login'
      })
    },
    tabClick () { },
    removeTab () { }
  }
}
</script>

<style scoped lang="less">
.el-header {
  height: auto;
  padding: 0;
  .header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 55px;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
    .header-lf {
      .collapse-icon {
        margin-right: 20px;
        font-size: 22px;
        cursor: pointer;
      }
      .el-breadcrumb {
        font-size: 14px;
        line-height: 1;
      }
    }
    .header-ri {
      margin: 0 30px;
      .username {
        margin: 0 20px 0 0;
        font-size: 15px;
        color: #000000bf;
      }
      .avatar {
        width: 40px;
        height: 40px;
        overflow: hidden;
        cursor: pointer;
        border-radius: 50%;
        display: flex;
      }
    }
    .flx-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .tabs-box {
    .tabs-menu {
      position: relative;
      width: 100%;
      ::v-deep .el-tabs {
        .el-tabs__header {
          box-sizing: border-box;
          height: 40px;
          padding: 0 10px;
          margin: 0;
          border-bottom: 1px solid #e4e7ed;
          .el-tabs__item {
            border: none;
          }
          .el-tabs__item.is-active {
            color: #406eff;
            border-bottom: 2px solid #406eff;
          }
          .el-tabs__nav {
            border: none;
          }
        }
      }
    }
  }
}
.footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 14px;
    color: #858585;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: calc(100vh);
}

.el-main {
  box-sizing: border-box;
  padding: 10px 13px;
  overflow-x: hidden;
  background: #f0f2f5;
  .main-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    overflow-x: hidden !important;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px #0000001a;
  }
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
