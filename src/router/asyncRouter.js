import main from '@/layout/index.vue'
// import componentRouter from '../router/componentRouter'
import HomeView from '@/views/HomeView.vue'

export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      icon: 'el-icon-s-home'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue')
  },
  {
    path: '/bigEvents',
    component: main,
    redirect: '/bigEvents/cates',
    meta: {
      title: '大事件-文章管理',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/bigEvents/cates',
        name: 'ArticleCate',
        meta: {
          title: '文章类别',
          icon: 'icon-leibie'
        },
        component: () => import(/* webpackChunkName: "ArticleCate" */ '@/views/bigEvents/cates.vue')
      },
      {
        path: '/bigEvents/articleList',
        name: 'ArticleList',
        meta: {
          title: '文章列表',
          icon: 'icon-liebiao'
        },
        component: () => import(/* webpackChunkName: "ArticleList" */ '@/views/bigEvents/articleList.vue')
      },
      {
        path: '/bigEvents/articleAdd',
        name: 'ArticleAdd',
        meta: {
          title: '发布文章',
          icon: 'icon-bianjiwenzhang_huaban'
        },
        component: () => import(/* webpackChunkName: "ArticleAdd" */ '@/views/bigEvents/articleAdd.vue')
      }
    ]
  },
  {
    path: '/component',
    name: 'Component',
    redirect: {
      name: 'Table'
    },
    meta: {
      title: '公用组件',
      icon: 'el-icon-setting'
    },
    component: () => import('@/views/component/table/list.vue'),
    children: [
      {
        path: '', // 如果你想要渲染点什么，可以提供一个 空的 子路由
        component: HomeView,
        meta: {
          title: '空跳转',
          icon: 'el-icon-s-order'
        }
      },
      {
        // 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。
        // path: '/table',
        path: '/component/table',
        name: 'Table',
        meta: {
          title: 'Table组件',
          icon: 'el-icon-s-order'
        },
        component: () => import(/* webpackChunkName: "Table" */ '@/views/component/table/list.vue')
      }
    ]
  }
]

/**
 * 1. 编程式 router.push(...)
 *    这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。
 *    router.push('home') // 字符串
 *    router.push({ path: 'home' }) // 对象
 *    router.push({ name: 'user', params: { userId: '123' }}) // 命名的路由
 *    router.push({ path: 'register', query: { plan: 'private' }}) // 带查询参数，变成 /register?plan=private
 *    如果提供了 path，params 会被忽略；你需要提供路由的 name 或手写完整的带有参数的 path：
 *      router.push({ path: `/user/${userId}` }) // -> /user/123
 *    注意： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，你需要使用 beforeRouteUpdate 来响应这个变化 (比如抓取用户信息)。
 *        beforeRouteUpdate(to, from, next) { // react to route changes... // don't forget to call next()}
 * 2. 命名路由
 *    要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
 *      <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
 * 3. 命名视图
 *    有时候想同时 (同级) 展示多个视图，而不是嵌套展示。
 *    如果 router-view 没有设置名字，那么默认为 default。
 *    一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
 *    <router-view class="view one"></router-view>
 *    <router-view class="view two" name="a"></router-view>
 *    <router-view class="view three" name="b"></router-view>
 *
 *    components: { default: Foo, a: Bar, b: Baz}
 * 4. 重定向和别名
 *    { path: '/a', redirect: '/b' } // 从 /a 重定向到 /b
 *    { path: '/a', redirect: { name: 'foo' }} // 重定向的目标也可以是一个命名的路由
 *
 *    /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
 *    { path: '/a', component: A, alias: '/b' }
 *    “别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
 * 5. 导航守卫
 *    全局前置守卫，按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
 *    全局解析守卫，可以用 router.beforeResolve 注册一个全局守卫。在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
 *    全局后置钩子，router.afterEach((to, from) => { // ... })
 *    路由独享的守卫，以在路由配置上直接定义 beforeEnter 守卫：component: Foo,beforeEnter: (to, from, next) => { // ... }
 *    组件内的守卫，可以在路由组件内直接定义以下路由导航守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
 *      beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
 *      beforeRouteEnter (to, from, next) {next(vm => { // 通过 `vm` 访问组件实例 })}
 *      注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。
 *      这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
 *    完整的导航解析流程：
 *      1. 导航被触发。
 *      2. 在失活的组件里调用 beforeRouteLeave 守卫。
 *      3. 调用全局的 beforeEach 守卫。
 *      4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
 *      5. 在路由配置里调用 beforeEnter。
 *      6. 解析异步路由组件。
 *      7. 在被激活的组件里调用 beforeRouteEnter。
 *      8. 调用全局的 beforeResolve 守卫 (2.5+)。
 *      9. 导航被确认。
 *      10. 调用全局的 afterEach 钩子。
 *      11. 触发 DOM 更新。
 *      12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
 * 6. 路由元信息
 *    一个路由匹配到的所有路由记录会暴露为 $route 对象 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。
 * 7. 滚动行为
 *    scrollBehavior (to, from, savedPosition) { // return 期望滚动到哪个的位置 }
 *    对于所有路由导航，简单地让页面滚动到顶部。
 *      scrollBehavior (to, from, savedPosition) { return { x: 0, y: 0 } }
 * 8. 路由懒加载
 *    const Foo = () => import('./Foo.vue')
 *    const router = new VueRouter({ routes: [{ path: '/foo', component: Foo }] })
 *    有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk (opens new window)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
 *    Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。
 */
