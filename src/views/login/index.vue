<template>
  <div class="container center">
    <!-- <img class="surfing" src="@/assets/svg/aircraft.svg" alt="" srcset="" /> -->
    <div class="login-content">
      <div class="content-left">
        <img src="@/assets/svg/login_left4.png" alt="" srcset="" />
        <!-- <img class="aircraft" src="@/assets/svg/aircraft.svg" alt="" srcset="" /> -->
      </div>
      <div class="content-right">
        <div class="login-form">
          <div class="login-log">
            <img class="login-icon" src="@/assets/logo.png" alt="" srcset="" />
            <p class="login-text">Vue2-Admin</p>
          </div>
          <div class="tabs">
            <div class="tab-title">
              <div
                class="tab-item"
                :class="activeName === 'login' ? 'active' : ''"
                @click="handleSwitch(0)"
              >
                登录
              </div>
              <div
                class="tab-item"
                :class="activeName === 'reguser' ? 'active' : ''"
                @click="handleSwitch(1)"
              >
                注册
              </div>
            </div>
            <div class="tab-content">
              <div class="tab-pane" v-if="activeName === 'login'">
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
                        show-password
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="code">
                      <div class="code-block">
                        <div class="code-input">
                          <el-input
                            v-model="ruleForm.code"
                            prefix-icon="el-icon-s-tools"
                            placeholder="验证码：1234"
                            autocomplete="off"
                            @keyup.enter.native="submitForm('ruleForm')"
                          >
                          </el-input>
                        </div>
                        <div
                          class="code-part"
                          v-html="imgUrl"
                          @click="getCode"
                        ></div>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <div class="tab-pane" v-if="activeName === 'reguser'">
                <div>
                  <el-form
                    :model="registerRuleForm"
                    status-icon
                    :rules="registerRules"
                    ref="registerRuleForm"
                    label-width="0"
                  >
                    <el-form-item label="" prop="username">
                      <el-input
                        v-model="registerRuleForm.username"
                        autocomplete="off"
                        prefix-icon="el-icon-user"
                        placeholder="请输入用户名"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                      <el-input
                        type="password"
                        v-model="registerRuleForm.password"
                        prefix-icon="el-icon-lock"
                        placeholder="请输入密码"
                        autocomplete="off"
                        show-password
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="checkPass">
                      <el-input
                        type="password"
                        prefix-icon="el-icon-circle-check"
                        v-model="registerRuleForm.checkPass"
                        placeholder="请再次输入密码"
                        autocomplete="off"
                        show-password
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="nickname">
                      <el-input
                        v-model="registerRuleForm.nickname"
                        autocomplete="off"
                        prefix-icon="el-icon-user"
                        placeholder="请输入昵称"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>

          <div class="login-btn">
            <el-button
              round
              icon="el-icon-circle-close"
              v-if="activeName === 'login'"
              @click="resetForm('ruleForm')"
              >重置</el-button
            >
            <el-button
              round
              type="primary"
              icon="el-icon-user-solid"
              v-if="activeName === 'login'"
              @click="submitForm('ruleForm')"
              :loading="loginLoading"
              >登录</el-button
            >
            <el-button
              round
              icon="el-icon-circle-close"
              v-if="activeName === 'reguser'"
              @click="resetForm('registerRuleForm')"
              >重置</el-button
            >
            <el-button
              round
              type="primary"
              icon="el-icon-check"
              v-if="activeName === 'reguser'"
              @click="submitForm('registerRuleForm')"
              :loading="loginLoading"
              >提交</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reguser, login, getCode } from '@/api/user';
export default {
  name: 'login',
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var uPattern = /^[A-Za-z0-9]+$/; // 用户名正则，用户名必须为2-12位字母/数字
    var pPattern = /^[\S]{6,12}$/; // 密码正则
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else if (!uPattern.test(value)) {
        callback(new Error('请正确输入，用户名必须为/数字/字母'));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (!pPattern.test(value)) {
        callback(new Error('请正确输入，6到12位的密码'));
      } else {
        if (this.registerRuleForm.checkPass !== '') {
          this.$refs.registerRuleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      imgUrl: '',
      activeName: 'login',
      loginLoading: false,
      ruleForm: {
        username: '',
        password: '',
        code: '',
      },
      registerRuleForm: {
        username: '',
        password: '',
        checkPass: '',
        nickname: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      registerRules: {
        username: [
          {
            min: 2,
            max: 12,
            message: '长度在 2 到 12 个字符',
            trigger: 'blur',
          },
          { validator: validateUserName, trigger: 'blur' },
        ],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    };
  },
  components: {},
  watch: {},
  mounted() {
    this.getCode();
  },
  methods: {
    getCode() {
      getCode().then((res) => {
        const { success, status, data } = res;
        if (success && status === 200) {
          this.imgUrl = data;
        }
      });
    },
    submitForm(formName) {
      this.loginLoading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'registerRuleForm') {
            // 注册
            const {
              username,
              password,
              nickname,
              avatar = '',
              email = '',
            } = this.registerRuleForm;
            let params = {
              username,
              password,
              nickname,
              avatar,
              email,
            };
            reguser(params).then((res) => {
              if (res.status === 200) {
                this.$message.success(res.message);
                this.activeName = 'login';
                this.$nextTick(() => {
                  this.$refs['ruleForm'] &&
                    this.$refs['ruleForm'].resetFields();
                  const { username, password } = this.registerRuleForm;
                  this.ruleForm.username = username;
                  this.ruleForm.password = password;
                });
              }
            });
          } else if (formName === 'ruleForm') {
            // 登陆
            const { username, password, code } = this.ruleForm;
            const param = {
              username,
              password,
              code,
            };
            this.$store.dispatch('getToken', param).then((res) => {
              if (res.status === 200) {
                this.$message.success(res.message);
                this.$router.push({
                  path: 'home',
                });
              }
            });
          }
          this.loginLoading = false;
        } else {
          this.loginLoading = false;
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSwitch(num) {
      this.activeName = num === 0 ? 'login' : 'reguser';
      const formName = num === 0 ? 'ruleForm' : 'registerRuleForm';
      if (num === 1) {
        this.registerRuleForm.checkPass = '';
      }
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
  },
};
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
  position: relative;
  overflow: hidden;
  .surfing {
    position: absolute;
    top: 250px;
    right: -35px;
    width: 150px;
    animation: a 13s ease-in-out infinite alternate;
    flex-shrink: 0;
    transform-origin: 50% 50%;
  }
  @keyframes a {
    0% {
      transform: translateZ(0);
    }
    50% {
      transform: translate3d(-7rem, -5rem, 0);
    }
    100% {
      transform: translateZ(0);
    }
  }
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
    z-index: 2;
    .content-left {
      width: 50%;
      img {
        width: 90%;
        height: 90%;
      }
    }

    .content-right {
      z-index: 3;
      .login-form {
        width: 420px;
        padding: 50px 40px 45px;
        background-color: #fffffffa;
        border-radius: 10px;
        box-shadow: 2px 3px 7px #0003;
        z-index: 3;
        .el-form-item {
          margin-bottom: 30px;
        }
        .login-btn {
          display: flex;
          justify-content: space-between;
          width: 100%;
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
          margin-bottom: 30px;
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
        .tabs {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          overflow: hidden;
          outline: none;
          .tab-title {
            display: flex;
            .tab-item {
              width: 50%;
              color: #96989e;
              background-color: #f5f5f5;
              text-align: center;
              padding: 10px 0;
              cursor: pointer;
              &:hover {
                background-color: #66b1ff;
                color: #fff;
              }
            }
            .active {
              color: #fff;
              background: #66b1ff;
            }
          }
          .tab-content {
            margin-top: 35px;
            .code-block {
              display: flex;
              .code-input {
                width: 100%;
              }
              .code-part {
                cursor: pointer;
              }
            }
          }
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
