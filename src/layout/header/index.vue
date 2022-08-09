<template>
  <div>
    <div class="header">
      <div class="header-lf flx-center">
        <i class="el-icon-s-fold collapse-icon"></i>
        <el-breadcrumb separator="/">
        </el-breadcrumb>
      </div>
      <div class="header-ri flx-center">
        <!-- Avatar -->
        <Avatar></Avatar>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './component/Avatar'
export default {
  name: 'SysHeader',
  components: { Avatar },
  data() {
    return {};
  },
  mounted() {
    
  },
  methods: {

  },
};
</script>

<style lang="less" scoped>
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
  }
  .flx-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>