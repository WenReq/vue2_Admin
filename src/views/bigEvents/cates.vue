<template>
  <div>
    <div class="title">
      <div class="mr10"></div>
      <div class="title-left">文章类别管理</div>
      <div class="title-right">
        <el-button @click="handleOpreate()" type="primary" size="small"
          >添加类别</el-button
        >
      </div>
    </div>
    <div class="content">
      <div class="content-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="分类名称"> </el-table-column>
          <el-table-column prop="alias" label="分类别名"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                @click="handleOpreate(scope.row.Id, scope.row)"
                type="text"
                size="small"
                icon="el-icon-edit"
                >编辑</el-button
              >
              <el-button
                @click="handleDelete(scope.row)"
                type="text"
                size="small"
                icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增和编辑的弹框 -->
    <el-dialog
      :title="`${opreateTile}文章分类`"
      :visible.sync="visibility"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            clearable
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="alias">
          <el-input
            v-model="ruleForm.alias"
            clearable
            placeholder="请输入分类别名"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibility = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提醒 -->
    <deleteDialog
      ref="deleteDialog"
      :title="'温馨提示'"
      :type="'error'"
      :content="`是否删除【${deleteName}】类别?`"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import { cates, addCates, updatecate, deletecate } from '@/api/cates';
import deleteDialog from '@/views/component/deleteDialog';

export default {
  name: 'ArticleCate',
  components: { deleteDialog },
  data() {
    return {
      deleteId: '',
      deleteName: '',
      visibility: false,
      editObj: {},
      ruleForm: {
        name: '',
        alias: '',
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        alias: [{ required: true, message: '请输入分类别名', trigger: 'blur' }],
      },
      tableData: [],
    };
  },
  // 计算属性
  computed: {
    opreateTile() {
      return Object.keys(this.editObj).length === 0 ? '新增' : '编辑';
    },
  },
  // 声明周期钩子 created
  created: function () {
    this.init();
  },
  // 声明周期钩子 mounted
  mounted() {},
  // 方法
  methods: {
    init() {
      this.getData();
    },
    getData() {
      cates().then((res) => {
        const { status, data, message } = res;
        this.tableData = data || [];
        status !== 0 && this.$message.error(message);
      });
    },
    // 新增和编辑操作
    handleOpreate(id, row = {}) {
      // 编辑当前行对象
      this.editObj = id ? row : {};
      if (id) this.ruleForm = row || {};
      this.visibility = true;
      this.$nextTick(() => {
        if (id === undefined) {
          this.ruleForm = {};
          this.$refs.ruleForm.resetFields();
        }
      });
    },
    // 新增和编辑保存操作
    handleSubmit() {
      const flag = Object.keys(this.editObj).length === 0 ? 'add' : 'edit';
      const fn = flag === 'add' ? addCates : updatecate;
      const { name, alias } = this.ruleForm;
      const id = this.editObj.Id || '';
      let param = new URLSearchParams();
      param.append('name', name);
      param.append('alias', alias);
      if (flag === 'edit') param.append('Id', id);
      fn(param).then((res) => {
        const { status, message } = res;
        const msgType = status === 0 ? 'success' : 'error';
        this.$message[msgType](message);
        this.visibility = status === 0 ? false : true;
        status === 0 && this.getData();
      });
    },
    // 删除操数据的操作
    handleDelete(row) {
      this.deleteName = row.name;
      this.deleteId = row.Id;
      this.$refs.deleteDialog.dialogVisible = true;
    },
    // 确定删除操作
    handleConfirm() {
      deletecate({ Id: this.deleteId }).then((res) => {
        const { status, message } = res;
        const msgType = status === 0 ? 'success' : 'error';
        this.$refs.deleteDialog.dialogVisible = false;
        this.$message[msgType](message);
        this.getData();
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 变量（Variables）
@6p: 6px;
@10p: 10px;
@18p: @10p + 8px;
@20p: @10p + 10px;
@opacity: 0.8;
@link-color: #428bca;
@link-color-hover: darken(@link-color, 10%);

// 变量插值
@my-selector: blue-grad; // 选择器
@property: color; // Properties 属性
@mt: margin-top; // Properties 属性

// 命名空间和访问符
#bundle() {
}

// 映射（Maps）
#colors() {
  primary: #0079fe;
  gradbc: #80a9fe;
  white: #fff;
}

// Maps 和 变量 - 应用
.line {
  width: @6p;
  height: @18p;
  background-color: #colors[primary];
}
// 变量插值 - 应用
.@{my-selector} {
  background-image: linear-gradient(
    260deg,
    #57a9ff 0%,
    #2c70fd 100%
  ) !important;
  border-color: #colors[gradbc];
  @{property}: #colors[white];
}

// 嵌套（Nesting）
.title {
  display: flex;
  align-items: center;
  .mr10 {
    margin-right: @10p;
    // 混合（Mixins）
    .line();
  }
  .title-right {
    margin-left: auto;
    :deep(.el-button) {
      // 混合（Mixins）
      .blue-grad();
      &:hover {
        opacity: @opacity;
      }
    }
  }
}

.content {
  &-table {
    @{mt}: @10p;
  }
}
</style>
