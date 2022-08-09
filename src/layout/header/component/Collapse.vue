<template>
  <div>
    <i class="icon" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleSetCollapse"></i>
  </div>
</template>

<script>
export default {
  name: 'Collapse',
  computed: {
    isCollapse () {
      return this.$store.state.menus.isCollapse
    }
  },
  methods: {
    handleSetCollapse() {
      this.$store.commit('setCollapse')
    },
  },
};
</script>

<style lang="less" scoped>
.icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
}
</style>