<template>
  <div>
    <div class="title">
      <div class="mr10"></div>
      <div class="title-left">文章类别管理</div>
      <div class="title-right">
        <el-button type="primary" size="small">添加类别</el-button>
      </div>
    </div>
    <div class="content">
      <div class="content-table"></div>
    </div>
    <!-- 新增和编辑的弹框 -->
    <!-- 删除提醒 -->
  </div>
</template>

<script>
export default {
  name: 'ArticleCate',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
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

// 命名空间和访问符
#bundle() {}

// 映射（Maps）
#colors() {
  primary: #0079fe;
  gradBc: #80a9fe;
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
  background-image: linear-gradient(260deg, #57a9ff 0%, #2c70fd 100%) !important;
  border-color: #colors[gradBc];
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
</style>