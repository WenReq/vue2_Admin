<template>
  <div>
    <div v-for="subItem in menuList" :key="subItem.path">
      <el-submenu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
        <template #title>
          <i :class="subItem.meta.icon"></i>
          <span>{{ subItem.meta.title }}</span>
        </template>
        <SubItem :menuList="subItem.children"></SubItem>
      </el-submenu>
      <el-menu-item v-else :index="subItem.path">
        <i :class="subItem.meta.icon"></i>
        <span>{{ subItem.meta.title }}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubItem',
  props: {
    menuList: {
      type: Array,
      default: () => [],
    }
  },
};
</script>

<style lang="less" scoped>

</style>