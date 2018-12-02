import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
  <div>
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
    console.log('comp mounted invoked')
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    }
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   propsData: {
//     active: true,
//     propOne: 'XXX'
//   },
//   data: {
//     text: 1322
//   },
//   mounted() {
//     console.log('instance mounted invoked')
//   }
// })

const comp2 = {
  extends: component,
  data() {
    return {
      text: 111
    }
  },
  mounted() {
    console.log('comp2 mounted invoked')
    console.log('parent:', this.$parent.$options.name)
    // this.$parent.text = 666;
  }
}

new Vue({
  name: 'Root',
  el: '#root',
  components: {
    CompDemo: comp2
  },
  data: {
    text: 1212
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp-demo></comp-demo>
    </div>
  `
})
