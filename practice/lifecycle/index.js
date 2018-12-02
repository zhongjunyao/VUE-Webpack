import Vue from 'vue';

const app = new Vue({
  // el: '#root',
  // template: `<div>{{text}}</div>`,
  data: {
    text: 'init vue'
  },
  beforeCreate() {
    console.log(this, 'beforeCreate')
  },
  created() {
    console.log(this, 'created')
  },
  beforeMount() {
    console.log(this, 'beforeMount')
  },
  mounted() {
    console.log(this, 'mounted')
  },
  beforeUpdate() {
    console.log(this, 'beforeUpdate')
  },
  updated() {
    console.log(this, 'updated')
  },
  activated() {
    console.log(this, 'activated')
  },
  deactivated() { // 组件相关
    console.log(this, 'deactivated')
  },
  beforeDestroy() { // 组件相关
    console.log(this, 'beforeDestroy')
  },
  destroyed() {
    console.log(this, 'destroyed')
  },
  render() { // render 发生在beforeMount和mounted之间执行
    throw new TypeError('render error');
    // console.log('render event')
    // return h('div', {}, this.text)
  },
  renderError(h, err) {
    // 在开发的时候才会被调用
    return h('div', {}, err.stack)
  },
  errorCaptured() {
    // 会向上冒泡，并且正式环境可以使用
  }
})
app.$mount('#root')
let i = 0;
setTimeout(() => {
  app.text = i++
}, 1000)

setTimeout(() => {
  app.$destroy();
}, 3000)
