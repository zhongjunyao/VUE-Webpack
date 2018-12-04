import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import './assets/style/global.styl'
import createRouter from './config/router'

const router = new createRouter();
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: (h) => h(App)
}).$mount(root)
