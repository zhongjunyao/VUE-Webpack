import Vue from 'vue';

const app = new Vue({
  el: '#root',
  template: `
  <div>
    <p v-text='text'></p>
    <p>Text:{{text}}</p>
    <p v-html='html'></p>
    <p v-pre>Text:{{text}}</p>
    <p v-show='active'>我是被显示或者隐藏的节点，节点还在文档中</p>
    <p v-if='text===0'>我是v-if 被操作移除或者加入的节点，节点会被移除或者加入文档中</p>
    <p v-else-if='text===1'>我是v-else-if</p>
    <p v-else>我是v-else</p>
    <ul>
      <li v-for='(item,idx) in arr' v-bind:key='item'>{{idx+1}} : {{item}}</li>
      <li v-for='(val,key,idx) in obj' v-bind:key='val'>{{idx}} : {{key}} : {{val}}</li>
    </ul>
    <input type='text' v-model.number.trim.lazy='inputVal' v-on:input='inputEv'/>
    <div>
      <input type='checkbox' value='1' v-model='checked'/>
      <input type='checkbox' value='2' v-model='checked'/>
      <input type='checkbox' value='3' v-model='checked'/>
    </div>
    <div>
      <input type='radio' value='banana' v-model='fruits'/>
      <input type='radio' value='strawberry' v-model='fruits'/>
      <input type='radio' value='watermelon' v-model='fruits'/>
    </div>
  </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: { name: 'Tom', job: 'Web Engineer', sex: 'famale' },
    text: 0,
    active: true,
    html: `<span>This is html.</span>`,
    inputVal: '你好',
    checked: [1, 2, 3],
    fruits: ''
  },
  methods: {
    inputEv(e) {
      console.log('inputEv is invoked', e)
    }
  }
})
setTimeout(() => {
  app.$set(app.obj, 'remark', 'Tom2')
}, 5000)
