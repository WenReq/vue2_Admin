<template>
  <div>
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item :to="{ path: HOME_URL }" key="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in matched" :key="item.path" :to="{ path: item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import { HOME_URL } from "@/config/config";
export default {
  name: 'Breadcrumb',
  data() {
    return {
      HOME_URL,
    };
  },
  computed: {
    matched () {
      // $route.matched 类型:Array 一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
      return this.$route.matched.filter(item => item.meta && item.meta.title)
    }
  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  font-size: 14px;
  line-height: 1;
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
	transition: all 0.2s ease;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
	opacity: 0;
	transform: translateX(10px);
}
.breadcrumb-leave-active {
	position: absolute;
	z-index: -1;
}
</style>