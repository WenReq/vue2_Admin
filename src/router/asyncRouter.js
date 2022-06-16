// import main from '@/components/layout/index.vue'
// import componentRouter from '../router/componentRouter'

export default [{
  path: '/home',
  name: 'home',
  meta: {
    id: 1,
    title: '首页'
  },
  component: () => import( /* webpackChunkName: "home" */ '@/views/HomeView.vue'),
}, {
  path: '/component',
  name: 'Component',
  meta: {
    title: '公用组件',
    id: 2
  },
  component: () => import('@/views/component/table/list.vue'),
  children: [{
    path: '/component/table',
    name: 'Table',
    meta: {
      parentId: 2,
      title: 'Table组件'
    },
    component: () => import( /* webpackChunkName: "Table" */ '@/views/component/table/list.vue'),
  }]
}]