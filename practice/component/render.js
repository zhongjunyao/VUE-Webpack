import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'compab',
  // template: `
  //   <div :style='style'>
  //     <slot name='body'/>
  //   </div>
  // `,
  render(h) {
    return h(
      'div',
      {
        style: this.style,
        // on: {
        //   click: () => { this.$emit('click') }
        // }
      }, [
        this.$slots.body,
        this.props1
      ]
    )
  },
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
  el: '#root',
  data: {
    value: '2018',
  },
  mounted() {
    console.log(this.$refs.comp, this.$refs.header)
  },
  methods: {
    handleClick() {
      console.log('handleClick invoked')
    }
  },
  // template: `
  //   <div>
  //     <comp-one ref='comp'>
  //       <p slot='body'>This is body {{value}}!</p>
  //     </comp-one>
  //   </div>
  // `,
  render(createElement) {
    return createElement(
      'div', {},
      [
        createElement(
          'comp-one',
          {
            ref: 'comp',
            props: {
              props1: this.value
            },
            // on: {
            //   click: this.handleClick
            // },
            nativeOn: {
              click: this.handleClick
            }
          },
          [
            createElement(
              'p',
              {
                slot: 'body'
              },
              `This is body ${this.value}`
            )
          ]
        ),
      ]
    )
  }
})
