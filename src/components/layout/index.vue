<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
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
            </div>
          </div>
          <div class="tabs-box"></div>
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
  data() {
    return {}
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {}
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
    }
    .flx-center {
      display: flex;
      align-items: center;
      justify-content: center;
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
