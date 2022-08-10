<template>
  <div>
    <div class="header">
      <div class="header-lf flx-center">
        <Collapse></Collapse>
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="header-ri flx-center">
        <Avatar></Avatar>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './component/Avatar'
import Collapse from './component/Collapse'
import Breadcrumb from './component/Breadcrumb'
export default {
  name: 'SysHeader',
  components: { Avatar, Collapse, Breadcrumb },
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
  .flx-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>