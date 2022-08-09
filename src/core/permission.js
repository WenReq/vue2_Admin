import router from "@/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['login', 'homePage']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = localStorage.getItem('vuex') && JSON.parse(localStorage.getItem('vuex')).users.accessToken
  if (token) {
    if (to.path === '/login') {
      next()
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})