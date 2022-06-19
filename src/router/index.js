import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from "../views/HomeView.vue";
import main from '@/components/layout/index.vue'
import asyncRouter from './asyncRouter'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: main,
    redirect: {
      path: '/home'
    },
    meta: {
      title: '主入口整体布局'
    },
    children: [...asyncRouter]
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/common/error.vue')
  },
  {
    path: '*',
    // redirect: '/error',
    redirect: {
      name: 'error'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
