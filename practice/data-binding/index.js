import Vue from 'vue';
let globalVar = '全局'; // eslint-disable-line
new Vue({
  el: '#root',
  template: `
    <div
      v-bind:id='name'
      :class='[{active:isActive},"no-active",isActive?"a1":"a2"]'
      :style='[styles,styles2]'
      v-on:click='handleClick'>
      {{isActive?'active':'no active'}}
      {{arr.join('|')}}
      {{getJoinArr(arr)}}
      {{Date.now()}}
      <button :style='styles' v-html='html'></button>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>我是html字符串</span>',
    name: 'page',
    styles: {
      color: 'red',
      appearance: 'none'
    },
    styles2: {
      fontWeight: '600'
    }
  },
  methods: {
    handleClick(e) {
      console.log('我是handleClick事件', e)
      this.isActive = !this.isActive;
    },
    getJoinArr(arr) {
      return arr.join('|')
    }
  }
})
