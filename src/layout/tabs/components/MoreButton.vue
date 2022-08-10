<template>
  <el-dropdown trigger="click">
    <el-button size="mini" type="primary">
      <span>更多</span>
      <el-icon class="el-icon-arrow-down"></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click.native="closeCurrentTab">关闭当前</el-dropdown-item>
        <el-dropdown-item @click.native="closeOtherTab">关闭其他</el-dropdown-item>
        <el-dropdown-item @click.native="closeAllTab">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { HOME_URL } from '@/config/config';

export default {
  name: 'MoreButton',
  computed: {
    tabsMenuValue() {
      return this.$store.state.tabs.tabsMenuValue
    }
  },
  methods: {
    closeCurrentTab() {
      if(HOME_URL === this.tabsMenuValue) return
      this.$store.dispatch('removeTabs', this.tabsMenuValue)
    },
    closeOtherTab() {
      this.$store.dispatch('closeMultipleTabs', this.tabsMenuValue)
    },
    closeAllTab() {
      this.$store.dispatch('closeMultipleTabs')
      this.$store.dispatch('goHome')
    },
  },
};
</script>