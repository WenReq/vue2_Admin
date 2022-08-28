<template>
  <el-dialog
    class="dialog"
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <span><i class="iconfont icon-warning"></i></span>
    <span>{{ content }}</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="handleConfirm" size="mini"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Wenv2WebDeleteDialog',
  props: {
    title: String,
    type: String,
    content: String,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  mounted() {},

  methods: {
    handleConfirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="less" scoped>
@u10: 10px;
@warning: #e6a23c;
@fl: flex;
@ct: center;
.dialog {
  :deep(.el-dialog__body) {
    padding: @u10 (@u10+ @u10);
    display: @fl;
    align-items: @ct;
    .icon-warning {
      font-size: @u10*3 - 5;
      color: @warning;
      margin-right: @u10;
    }
  }
}
</style>
