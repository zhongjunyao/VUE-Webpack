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

// 动态注册模块
store.registerModule('c',{
  state:{
    text:3
  }
})
store.unregisterModule('c')

// const stopWatch = store.watch((state)=>state.count+1,(newCount)=>{
//   console.log('store newCount:',newCount)
// })
// setTimeout(()=>{
//   stopWatch();
// },3000)
// store.subscribe((mutation, state) => { //eslint-disable-line
//   console.log('subscribe mutation.type:',mutation.type)
//   console.log('subscribe mutation.payload:',mutation.payload)
// })
store.subscribeAction((action, state)=>{//eslint-disable-line
  console.log('subscribe action.type',action.type)
  console.log('subscribe action.payload',action.payload)
})
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
