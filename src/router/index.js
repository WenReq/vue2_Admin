/*
 * @Descripttion:
 * @Author: wenshaochang
 * @Date: 2022-06-16 19:43:07
 * @LastEditors: wenshaochang
 * @LastEditTime: 2022-06-20 19:49:29
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
// import HomeView from "../views/HomeView.vue";
import asyncRouter from './asyncRouter';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  ...asyncRouter,
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/common/error.vue'),
  },
  {
    path: '*',
    // redirect: '/error',
    redirect: {
      name: 'error',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => {
    return { x: 0, y: 0 };
  },
});

export default router;
