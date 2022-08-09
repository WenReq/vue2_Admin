/*
 * @Description: 项目入口文件
 * @Author: wenshaochang
 * @Date: 2022-06-13 21:40:47
 * @LastEditors: wenshaochang
 * @LastEditTime: 2022-06-18 22:24:01
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import './core/use'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
