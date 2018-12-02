import Vue from 'vue'

// const data = {
//   text: 0
// }

const component = {
  props: {
    active: {
      // type: Boolean,
      validator(value) {
        console.log(`typeof value === 'boolean'`, typeof value === 'boolean')
        return typeof value === 'boolean'
      }
      // required: true // 指定为true，代表该值必须传
      // default: true  // 设置默认值
      // default: { // 接收对象必须用这样的形式声明默认值
      //   return {
      //     //
      //   }
      // }
    },
    propOne: String
  },
  template: `
  <div ref='compa'>
    <p>This is a component</p>
    <input type='text' v-model='text' @input='handleInput'>
    <p v-show='active'>可见或者不可见{{propOne}}</p>
  </div>
  `,
  data() { // 组件中使用 return 一个全新的数据对象，而不是一个全局变量，是为了避免组件复用的时候数据相互影响
    // return data
    return {
      text: 0
    }
  },
  mounted() {
    console.log(this.$refs.compa)
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div ref='root'>
      <comp-one ref='compa' :active='active' prop-one='你好' @input='handleInput'></comp-one>
      <comp-one :active='false'></comp-one>
    </div>
  `,
  data: {
    active: false
  },
  mounted() {
    console.log(this.$refs)
  },
  methods: {
    handleInput(e) {
      console.log('输入内容', e.target.value)
    },
  }
})
