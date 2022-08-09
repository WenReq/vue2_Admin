<template>
  <div class="avatar-flex">
    <span class="username"> {{ nickname }} </span>
    <el-dropdown trigger="click">
      <div class="avatar">
        <img v-if="userInfoForm.user_pic" :src="userInfoForm.user_pic" alt="avatar">
        <img v-else src="@/assets/img/avatar.gif" alt="avatar" srcset="" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleUserInfo">个人资料</el-dropdown-item>
        <el-dropdown-item @click.native="handleUpdatePwd">修改密码</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLayout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码 -->
    <PasswordDialog ref="passwordRef"></PasswordDialog>
    <!-- 个人资料 -->
    <InfoDialog ref="infoRef" :userInfoForm="userInfoForm"></InfoDialog>
  </div>
</template>

<script>
import InfoDialog from './InfoDialog'
import PasswordDialog from './PasswordDialog'
import { userinfo } from '@/api/user'

export default {
  name: 'SysAvatar',
  components: { InfoDialog, PasswordDialog },
  data() {
    return {
      nickname: '',
      userInfoForm: {},
    };
  },
  created: function() { 
    this.getUserInfo();
  },
  mounted() {},
  methods: {
    getUserInfo() {
      userinfo().then(res => {
        const { status, message, data} = res
        if(status === 0) {
          this.userInfoForm = data || {}
          this.nickname = data.nickname || ''
        } else {
          this.$message.error(message)
        }
      })
    },
    handleLayout () {
      this.$confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('vuex')
        this.$router.push({
          path: '/login'
        })
      })
    },
    handleUserInfo() {
      this.$refs.infoRef?.openDialog()
    },
    handleUpdatePwd() {
      this.$refs.passwordRef?.openDialog()
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-flex {
  display: flex;
  align-items: center;
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
</style>