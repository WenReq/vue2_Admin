<template>
  <div>
    <div v-for="subItem in menuList" :key="subItem.path">
      <el-submenu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
        <template #title>
          <el-icon>
            <component :is="subItem.icon"></component>
          </el-icon>
          <span>{{ subItem.meta.title }}</span>
        </template>
        <SubItem :menuList="subItem.children"></SubItem>
      </el-submenu>
      <el-menu-item v-else :index="subItem.path">
        <el-icon>
          <component :is="subItem.icon"></component>
        </el-icon>
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
  mounted() {
    console.log(this.menuList)
  }
};
</script>

<style lang="less" scoped>

</style>