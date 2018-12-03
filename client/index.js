import Vue from 'vue'
import App from './app.vue'
import Router from './config/router'

Vue.use(Router)

import './assets/style/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
  render: (h) => h(App)
}).$mount(root)
