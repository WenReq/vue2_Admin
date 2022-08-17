<template>
  <div class="layout">
    <el-container class="el-container">
      <el-aside>
        <Aside></Aside>
      </el-aside>
      <el-container class="el-container">
        <el-header style="height: auto">
          <Header></Header>
          <Tabs></Tabs>
        </el-header>
        <el-main>
          <section class="main-box">
            <router-view v-slot="{ Component, route }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive>
                  <component :is="Component" :key="route.path"></component>
                </keep-alive>
              </transition>
            </router-view>
            <!-- <router-view/> -->
          </section>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import Tabs from './tabs/index.vue'
import Footer from './footer.vue'
export default {
  name: 'layout',
  components: { Aside, Header, Tabs, Footer },
  data() {
    return {
      
    }
  },
}
</script>

<style scoped lang="less">
.layout {
  height: 100vh;
}
.el-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.el-header {
  height: auto;
  padding: 0;
}

.el-aside {
  width: auto !important;
  overflow: inherit;
  background-color: #191a20;
}

.el-main {
  box-sizing: border-box;
  padding: 10px 13px;
  overflow-x: hidden;
  background: #f0f2f5;
  .main-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow: auto;
    overflow-x: hidden !important;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px #0000001a;
    .fade-transform-leave-active,
    .fade-transform-enter-active {
      transition: all 0.2s;
    }
    .fade-transform-enter-from {
      opacity: 0;
      transform: translateX(-30px);
      transition: all 0.2s;
    }
    .fade-transform-leave-to {
      opacity: 0;
      transform: translateX(30px);
      transition: all 0.2s;
    }
  }
}

.el-footer {
  height: auto !important;
}
</style>
