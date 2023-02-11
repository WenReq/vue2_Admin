<template>
  <div>
    <!-- 头部 -->
    <div class="title">
      <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
        <el-form-item label="名称">
          <el-input v-model="searchForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
          <el-button @click="handleReset('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-block">
      <div>
        <el-button @click="handleOpreate()" type="primary" size="small"
          >添加</el-button
        >
      </div>
    </div>
    <!-- table -->
    <div class="content">
      <div class="content-table">
        <el-table
          :data="tableData"
          border
          v-loading="tableLoading"
          :height="`calc(100vh - 330px)`"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column prop="id" width="60" label="ID"> </el-table-column>
          <el-table-column prop="name" label="名称" width="130">
          </el-table-column>
          <el-table-column prop="tags" label="标签" width="160">
            <template slot-scope="scope">
              {{ scope.row.tags | tagsFilter }}
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
            <template slot-scope="scope">
              {{ scope.row.createTime | dateFilter }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="handleOpreate(scope.row.id, scope.row)"
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
              <el-button
                @click="
                  () => {
                    tagVisibility = true;
                    rowId = scope.row.id;
                    selectTagsList = [];
                  }
                "
                type="text"
                size="small"
                icon="el-icon-collection-tag"
                >添加标签</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="content-page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 新增和编辑的弹框 -->
    <el-dialog
      :title="`${opreateTile}弹框`"
      :visible.sync="visibility"
      width="30%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        size="small"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            clearable
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            v-model="ruleForm.desc"
            clearable
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibility = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 删除提醒 -->
    <deleteDialog
      ref="deleteDialog"
      :title="'温馨提示'"
      :type="'error'"
      :content="`是否删除【${deleteName}】数据?`"
      @confirm="handleConfirm"
    />

    <!-- 标签 -->
    <el-dialog title="添加标签" :visible.sync="tagVisibility" width="30%">
      <el-select
        style="width: 100%"
        v-model="selectTagsList"
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tagVisibility = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleTagSubmit" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatting } from '@/utils/common.js';
import { getData, add, update, del, addTag } from '@/api/crud';
import deleteDialog from '@/views/component/deleteDialog';

export default {
  name: 'ArticleCate',
  components: { deleteDialog },
  data() {
    return {
      rowId: '',
      deleteId: '',
      deleteName: '',
      visibility: false,
      tableLoading: false,
      tagVisibility: false,
      editObj: {},
      searchForm: {
        name: '',
      },
      ruleForm: {
        name: '',
        desc: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
      },
      pagination: {
        page: 1,
        total: 0,
        pageSize: 10,
      },
      tableData: [],
      selectTagsList: [],
      options: [
        {
          value: '好人',
          label: '好人',
        },
        {
          value: '坏人',
          label: '坏人',
        },
        {
          value: '不好不坏',
          label: '不好不坏',
        },
        {
          value: '办案',
          label: '办案',
        },
        {
          value: '检举',
          label: '检举',
        },
        {
          value: '杀人',
          label: '杀人',
        },
        {
          value: '涉黑',
          label: '涉黑',
        },
        {
          value: '贪污',
          label: '贪污',
        },
      ],
    };
  },
  filters: {
    dateFilter(val) {
      return formatting(val);
    },
    tagsFilter(val) {
      return val.map((it) => it.name).join('，');
    },
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
    // 获取列表数据
    getData() {
      this.tableLoading = true;
      const params = {
        keyword: this.searchForm.name,
        page: this.pagination.page,
        pageSize: this.pagination.pageSize,
      };
      getData(params)
        .then((res) => {
          const { status, data, message } = res.data;
          this.tableData = data.data || [];
          this.pagination.total = data.total || 0;
          status !== 200 && this.$message.error(message);
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = true;
        });
    },
    // 搜索重置
    handleReset() {
      this.$refs[formName].resetFields();
    },
    // 新增和编辑操作
    handleOpreate(id, row = {}) {
      // 编辑当前行对象
      this.editObj = id ? JSON.parse(JSON.stringify(row)) : {};
      if (id) this.ruleForm = JSON.parse(JSON.stringify(row)) || {};
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
      const fn = flag === 'add' ? add : update;
      const { name, desc } = this.ruleForm;
      const id = this.editObj.id || '';
      let param = {
        name,
        desc,
      };
      if (flag === 'edit') param.id = id;
      fn(param).then((res) => {
        const { status, message } = res.data;
        const msgType = status === 200 ? 'success' : 'error';
        this.$message[msgType](message);
        this.visibility = status === 200 ? false : true;
        status === 200 && this.getData();
      });
    },
    // 删除操数据的操作
    handleDelete(row) {
      this.deleteName = row.name;
      this.deleteId = row.id;
      this.$refs.deleteDialog.dialogVisible = true;
    },
    // 确定删除操作
    handleConfirm() {
      del({ id: this.deleteId }).then((res) => {
        const { status, message } = res;
        const msgType = status === 200 ? 'success' : 'error';
        this.$refs.deleteDialog.dialogVisible = false;
        this.$message[msgType](message);
        this.getData();
      });
    },
    // 分页 - 改变一页显示多少条
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getData();
    },
    // 分页 - 改变页码
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getData();
    },
    // 添加标签
    handleTagSubmit() {
      const params = {
        curdId: this.rowId,
        tags: this.selectTagsList,
      };
      addTag(params).then((res) => {
        const { status, message } = res.data;
        const msgType = status === 200 ? 'success' : 'error';
        this.$message[msgType](message);
        this.tagVisibility = status === 200 ? false : true;
        status === 200 && this.getData();
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

.btn-block {
  display: flex;
  align-items: center;
}

.content {
  &-table {
    @{mt}: @10p;
  }
  &-page {
    @{mt}: @10p;
    text-align: right;
  }
}
</style>
