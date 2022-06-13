<template>
  <div class="container center">
    <div class="login-content">
      <div class="content-left">
        <img src="@/assets/svg/login_left4.png" alt="" srcset="" />
        <!-- <img class="aircraft" src="@/assets/svg/aircraft.svg" alt="" srcset="" /> -->
      </div>
      <div class="content-right">
        <img class="surfing" src="@/assets/svg/aircraft.svg" alt="" srcset="" />
        <div class="login-form">
          <div class="login-log">
            <img class="login-icon" src="@/assets/logo.png" alt="" srcset="" />
            <p class="login-text">Wenv2-Admin</p>
          </div>
          <div>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="0"
              class="demo-ruleForm"
            >
              <el-form-item label="" prop="username">
                <el-input
                  v-model="ruleForm.username"
                  autocomplete="off"
                  prefix-icon="el-icon-user"
                  placeholder="用户名：admin / root"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  prefix-icon="el-icon-lock"
                  placeholder="密码：123456"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="login-btn">
            <el-button @click="resetForm('ruleForm')" round icon="el-icon-circle-close"
              >重置</el-button
            >
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              round
              icon="el-icon-user-solid"
              >登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  components: {},
  watch: {},
  mounted () { },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  min-width: 550px;
  min-height: 500px;
  background-color: #eee;
  background-image: url('@/assets/svg/login_bg.svg');
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .login-content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 30px;
    overflow: hidden;
    background-color: #fffc;
    border-radius: 10px;
    box-sizing: border-box;
    .content-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .content-right {
      width: 500px;
      height: 395px;
      flex-shrink: 0;
      position: relative;
      .login-form {
        position: absolute;
        z-index: 2;
        width: 420px;
        padding: 50px 40px 45px;
        background-color: #fffffffa;
        border-radius: 10px;
        box-shadow: 2px 3px 7px #0003;
        z-index: 3;
        .el-form-item {
          margin-bottom: 40px;
        }
        .login-btn {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 40px;
          white-space: nowrap;
          .el-button {
            width: 185px;
          }
          .el-button--large.is-round {
            padding: 12px 19px;
          }
        }
        .login-log {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 45px;
          .login-icon {
            width: 52px;
            height: 52px;
          }
          .login-text {
            padding-left: 25px;
            font-size: 42px;
            font-weight: 700;
            color: #34495e;
            white-space: nowrap;
          }
        }
      }
      .surfing {
        position: absolute;
        top: -100px;
        right: -100px;
        width: 120px;
        animation: a 4s ease-in-out infinite alternate;
        flex-shrink: 0;
        transform-origin: 50% 50%;
        z-index: 2;
      }
      @keyframes a {
        0% {
          transform: translateZ(0);
        }
        50% {
          transform: translate3d(-1.5rem, -1.5rem, 0);
        }
        100% {
          transform: translateZ(0);
        }
      }
    }
  }
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
