<template>
  <div class="layout">
    <el-container class="el-container">
      <el-aside width="auto">
        <Aside :isCollapse="isCollapse" @selectMenuItem="pathBugFun"></Aside>
      </el-aside>
      <el-container class="el-container">
        <el-header style="height: auto">
          <div class="header">
            <div class="header-lf flx-center">
              <i class="el-icon-s-fold collapse-icon" @click="isCollapse = !isCollapse"></i>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in selectMenu" :key="item.index">{{
                  item.title
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="header-ri flx-center">
              <span class="username"> {{ sysUserName }} </span>
              <el-dropdown trigger="click">
                <div class="avatar">
                  <img src="@/assets/img/avatar.gif" alt="avatar" srcset="" />
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="handleUserInfo">个人资料</el-dropdown-item>
                  <el-dropdown-item @click.native="handleUpdatePwd">修改密码</el-dropdown-item>
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
          <section class="main-box">
            <router-view></router-view>
          </section>
        </el-main>
        <div class="footer">
          <a href="https://www.wenreq.site/" target="_blank"
            >2022 © Vue2 Admin By WenShaoChang Technology.</a
          >
        </div>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" width="45%" :visible.sync="updatePwdVisibility" >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次确认密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人资料 -->
    <el-dialog title="个人资料" width="45%" :visible.sync="userInfoVisibility" >
      <el-form :model="userInfoForm" status-icon :rules="userInfoRules" ref="userInfoForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="userInfoForm.username" readonly autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userInfoForm.nickname" autocomplete="off" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="userInfoForm.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetUserForm('userInfoForm')">取 消</el-button>
        <el-button type="primary" @click="submitUserForm('userInfoForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userinfo, updateUserInfo } from '@/api/user'
import Aside from './aside.vue'
export default {
  name: 'layout',
  data () {
    return {
      sysUserName: '',
      isCollapse: false,
      userInfoVisibility: false,
      updatePwdVisibility: false,
      selectMenu: this.$store.state.users.selectMenu,
      userInfoForm: {},
      userInfoRules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
        ],
      },
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [
          { required: true, message: '原密码不能为空', trigger: 'blur' },
        ],
        newPass: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
        ],
        checkPass: [
          { required: true, message: '再次确认密码不能为空', trigger: 'blur' },
        ],
      }
    }
  },
  components: { Aside },
  watch: {},
  computed: {
    // selectMenu () {
    //   return this.$store.state.users.selectMenu
    // },
    tabsMenuList () {
      return this.$store.state.users.tabsState.tabsMenuList
    },
    tabsMenuValue: {
      // getter
      get: function () {
        return this.$store.state.users.tabsState.tabsMenuValue
      },
      // setter
      set: function (newValue) {
        // 切换 tab 时，store 和 localStore 都要更改
        let tabsState = this.$store.state.users.tabsState
        tabsState.tabsMenuValue = newValue
        localStorage.setItem('TABS_STATE', JSON.stringify(tabsState))
        this.$store.commit('users/setTabsState', tabsState)
      }
    }
  },
  created: function() { 
    this.handleSysUsername();
    this.getUserInfo();
  },
  mounted () { },
  methods: {
    getUserInfo: function() {
      userinfo().then(res => {
        const { status, message, data} = res
        if(status === 0) {
          this.userInfoForm = data || {}
        } else {
          this.$message.error(message)
        }
      })
    },
    handleSysUsername() {
      this.sysUserName = localStorage.getItem('USER_NAME')
    },
    handleLayout () {
      this.$confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('USER_NAME')
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('SELECT_MENU')
        this.$router.push({
          path: '/login'
        })
      })
    },
    handleUserInfo() {
      this.userInfoVisibility = true
    },
    handleUpdatePwd() {
      this.updatePwdVisibility = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.updatePwdVisibility = false
    },
    resetUserForm(formName) {
      this.$refs[formName].resetFields();
      this.userInfoVisibility = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('密码修改成功')
          this.resetForm(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    submitUserForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { id, nickname, email } = this.userInfoForm
          const params = { id, nickname, email }
          const config = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          updateUserInfo(params, config).then(res => {
            const { status, message } = res
            if (status === 0) {
              this.$message.success(message)
            } else {
              this.$message.error(message)
            }
          })
          this.resetForm(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    tabClick (val) {
      this.$router.push({
        path: val.name
      })
    },
    removeTab (val) {
      console.log(val)
      let tabsState = this.$store.state.users.tabsState
    },
    pathBugFun (val) {
      this.selectMenu = val
    }
  }
}
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
}
.el-container {
  display: flex;
  width: 100%;
  height: 100%;
}
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
  width: auto;
  overflow: inherit;
  background-color: #191a20;
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
