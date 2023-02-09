<template>
  <el-dialog title="修改密码" width="45%" :visible.sync="updatePwdVisibility">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldPass">
        <el-input
          type="password"
          v-model="ruleForm.oldPass"
          autocomplete="off"
          placeholder="请输入原密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"
          placeholder="请输入新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          placeholder="请再次确认密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { updatePwd } from '@/api/user';
export default {
  name: 'PasswordDialog',

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      updatePwdVisibility: false,
      ruleForm: {
        oldPass: '',
        newPass: '',
        checkPass: '',
      },
      rules: {
        oldPass: [
          { message: '原密码不能为空', trigger: 'blur', required: true },
        ],
        newPass: [{ validator: validatePass, trigger: 'blur', required: true }],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: true },
        ],
      },
    };
  },

  mounted() {},

  methods: {
    openDialog() {
      this.updatePwdVisibility = true;
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.updatePwdVisibility = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('oldPwd', this.ruleForm.oldPass);
          params.append('newPwd', this.ruleForm.newPass);
          updatePwd(params).then((res) => {
            const { status, message } = res;
            if (status === 0) {
              this.updatePwdVisibility = false;
              this.$message.success(message);
            } else {
              this.$message.error(message);
            }
          });
          this.resetForm(formName);
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
