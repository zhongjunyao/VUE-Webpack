import Vue from 'vue'

const component = {
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value'],
  template: `
    <div>
      value:<input type='text' :value='value'>
      value1:<input type='text' @input="$emit('change', $event.target.value)" :value='value1'>
    </div>
  `
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data: {
    value: 'ss',
    value1: ''
  },
  // template: `
  //   <div>
  //     <comp-one :value='value' @input='value = arguments[0]'></comp-one>
  //     <comp-one :value='value' @input='value = $event'></comp-one>
  //   </div>
  // `
  template: `
    <div>
      <comp-one :value='value' v-model='value1'></comp-one>
    </div>
  `
})
