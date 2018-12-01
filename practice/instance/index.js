import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: `<div ref='div'>{{author}} {{obj.a}}</div>`,
  data: {
    author: 0,
    obj: {}
  },
  // watch不注销的话，会造成内存溢出。在内部写监听属性的方式，在app被注销的时候watch会被一起注销
  // watch: {
  //   author(newVal, oldVal) {
  //     console.log(`${newVal}:${oldVal}`);
  //   }
  // },
})

app.$mount('#root')
let i = 0;
setInterval(() => {
  i++;
  // app.obj.a = i;
  // app.$forceUpdate();// 该函数会导致整个组件重新渲染，不建议使用
  app.$set(app.obj, 'a', i)
  // setTimeout(() => { app.$delete(app.obj, 'a') }, 3000)
  // console.log('执行了interval');
  // app.author++; // 可以更改data中的author的值，并将效果反应在页面上
  // app.$data.author++; // 可以更改data中的author的值，并将效果反应在页面上
  // app.$options.data.author++; // 可以更改$options.data中的author值，页面上没效果
}, 1000)

// 1.vue实例的属性
// console.log('$data:', app.$data);  // vue中的data,app.$data与app都可用于修改data中的值,并将效果反应在页面上
// console.log('$props:', app.$props); // vue实例中定义的props属性
// console.log('$el:', app.$el);  // 元素<div>This is a template 0 !</div>
// console.log('$options:', app.$options); // 这是一整个vue实例对象，但是和当前使用的对象不是同一个引用
// app.$options.render = (h) => {
//   console.log('执行了新的render方法')
//   return h('div', {}, "new Render function")
// }
// console.log('$root:', app.$root);
// console.log('$root与app是否完全一致', app.$root === app);
// 组件相关
// console.log('$children:', app.$children)
// console.log('$slots:', app.$slots)
// console.log('$scopedSlots:', app.$scopedSlots)
// console.log('$refs:', app.$refs); // {div:div}  指向模版
// console.log('$isServer:', app.$isServer) // 判定当前 Vue 实例是否运行于服务器

// 2.vue实例的方法
// const unWatch = app.$watch('author', (newVal, oldVal) => {
//   console.log(`${newVal}:${oldVal}`);
// })
// setTimeout(() => { unWatch(); }, 2000)// unwatch是一个注销watch的函数

// app.$on('test', (a, b) => {
//   console.log('test事件被触发', a, b);
// })
// app.$once('test', (a, b) => {
//   console.log('test事件被触发', a, b);
// })
// app.$emit('test', 1, 3);
// app.$emit('test', 1, 3);


