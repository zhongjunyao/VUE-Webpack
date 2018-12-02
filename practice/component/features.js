import Vue from 'vue'

const Compc = {

  template: `
    <div>This is compa {{data.value}}</div>
  `,
  inject: ['grandpa', 'data'],
  mounted() {
    console.log('Compc:', this.$parent.$options.name, this.grandpa, this.data.value)
  }
}

const component = {
  name: 'compab',
  components: { Compc },
  template: `
    <div :style='style'>
      <slot name='header'/>
      <slot name='body'/>
      <slot name='footer' :value='value' :slotname='slotname'/>

      <compc />
    </div>
  `,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #efefef'
      },
      value: '2019',
      slotname: 'component name'
    }
  }
}

new Vue({
  name: 'compa',
  components: {
    CompOne: component
  },
  provide() {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      grandpa: this,
      data
    }
  },
  el: '#root',
  data: {
    value: '2018',
  },
  mounted() {
    console.log(this.$refs.comp, this.$refs.header)
  },
  template: `
    <div>
      <comp-one ref='comp'>
        <p slot='header' ref='header'>This is header !</p>
        <p slot='body'>This is body {{value}}!</p>
        <p slot='footer' slot-scope='props'>This is footer {{props.value}} {{props.slotname}}!</p>
      </comp-one>
      <input type='text' v-model='value'>
    </div>
  `
})
