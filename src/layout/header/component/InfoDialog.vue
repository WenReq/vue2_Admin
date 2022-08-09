<template>
  <el-dialog title="个人资料" width="45%" :visible.sync="userInfoVisibility" >
    <el-form :model="userInfoForm" status-icon :rules="userInfoRules" ref="userInfoForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像">
        <el-upload
          :size="46"
          :limit="1"
          class="avatar-uploader"
          action=""
          :on-progress="getFile"
          accept="image/jpeg"
        >
          <img v-if="userInfoForm.user_pic" :src="userInfoForm.user_pic" ref="avatarImage" alt="avatar" class="avatar" style="width: 100px;height: 100px;border-radius: 50%;">
          <img style="width: 100px;height: 100px;border-radius: 50%;" v-else src="@/assets/img/avatar.gif" alt="avatar">
        </el-upload>
      </el-form-item>
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
</template>

<script>
import { updateUserInfo, updateAvatar } from '@/api/user'

export default {
  name: 'InfoDialog',
  props: {
    userInfoForm: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      userInfoVisibility: false,
      userInfoRules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    openDialog() {
      this.userInfoVisibility = true
    },
    resetUserForm(formName) {
      this.$refs[formName].resetFields();
      this.userInfoVisibility = false
    },
    submitUserForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = new URLSearchParams()
          param.append('id', this.userInfoForm.id)
          param.append('nickname', this.userInfoForm.nickname)
          param.append('email', this.userInfoForm.email)
          const config = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          updateUserInfo(param, config).then(res => {
            const { status, message } = res
            if (status === 0) {
              this.userInfoVisibility = false
              this.$message.success(message)
              this.getUserInfo()
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
    getFile(event, file) {
      const vm = this
      // 检查文件大小及格式
      const isJPG = file.raw.type === 'image/jpeg';
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isJPG && isLt2M){
        debugger
        vm.getBase64(file.raw).then(res => {
          vm.handleSetAvatar({ avatar:res })
        })
      }
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() { 
          imgResult = reader.result;
        };
        reader.onerror = function(error) { 
          reject(error);
        };
        reader.onloadend = function() { 
          resolve(imgResult);
        };
      })
    },
    handleSetAvatar(obj) {
      let params = new URLSearchParams();
      params.append('avatar', obj.avatar);
      updateAvatar(params).then(res => {
        const { status, message } = res
        if (status === 0) {
          this.$message.success(message)
          this.getUserInfo()
        } else {
          this.$message.error(message)
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>

</style>