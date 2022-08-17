<template>
  <div>
    <div class="tabs-box">
      <div class="tabs-menu">
        <el-tabs
          v-model="tabsMenuValue"
          type="card"
          @tab-click="tabClick"
          @tab-remove="removeTabs"
        >
          <el-tab-pane
            v-for="item in tabsMenuList"
            :key="item.path"
            :path="item.path"
            :label="item.title"
            :name="item.path"
            :closable="item.close"
          >
            <template #label>
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.title }}
            </template>
          </el-tab-pane>
        </el-tabs>
        <MoreButton></MoreButton>
      </div>
    </div>
  </div>
</template>

<script>
import MoreButton from './components/MoreButton.vue'
export default {
  name: 'SysTabs',
  components: {MoreButton},
  data() {
    return {
      
    };
  },
  watch: {
    // 监听路由的变化，防止后退前进不变化 tabsMenuValue
    '$route': {
      handler: function (value) {
        let params = {
          title: value.meta.title,
          path: value.path,
          close: true
        };
        this.$store.dispatch('addTabs', params);
      },
      immediate: true,
    },
  },
  computed: {
    tabsMenuValue: {
      get: function() {
        return this.$store.state.tabs.tabsMenuValue
      },
      set: function(value) {
        this.$store.commit('setTabsMenuValue', value)
      },
    },
    tabsMenuList() {
      return this.$store.state.tabs.tabsMenuList
    },
  },
  methods: {
    tabClick (val) {
      this.$router.push({
        path: val.name
      })
    },
    removeTabs (val) {
      this.$store.dispatch('removeTabs', val)
    },
  },
};
</script>

<style lang="less" scoped>
.tabs-box {
  .tabs-menu {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    :deep(.el-tabs) {
      .el-tabs__header {
        box-sizing: border-box;
        height: 40px;
        padding: 0 10px;
        margin: 0;
        border-bottom: 1px solid #e4e7ed;
        .el-tabs__item {
          border: none;
        }
        .el-tabs__item.is-active {
          color: #406eff;
          border-bottom: 2px solid #406eff;
        }
        .el-tabs__nav {
          border: none;
        }
      }
    }
    .el-dropdown {
      margin-left: auto;
      margin-right: 10px;
    }
  }
}
</style>