import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/style/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter();
const store = createStore();

router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  // console.log('to:', to, 'from:', from, to.fullPath, to.fullPath === '/login')
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next();
})
router.afterEach((to, from) => { // eslint-disable-line
  console.log('afterEach invoked')
  // console.log('to:', to, 'from:', from)
})

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
