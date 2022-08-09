<template>
  <div>
    <div class="tabs-box">
      <div class="tabs-menu">
        <el-tabs
          v-model="tabsMenuValue"
          type="card"
          @tab-click="tabClick"
          @tab-remove="removeTab"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SysTabs',

  data() {
    return {
      tabsMenuList: []
    };
  },
  computed: {
    tabsMenuValue () {
      return this.$route.path
    },
  },
  mounted() {
    
  },

  methods: {
    tabClick (val) {
      this.$router.push({
        path: val.name
      })
    },
    removeTab (val) {
      let tabsState = this.$store.state.users.tabsState
    },
  },
};
</script>

<style lang="less" scoped>
.tabs-box {
  .tabs-menu {
    position: relative;
    width: 100%;
    ::v-deep .el-tabs {
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
  }
}
</style>