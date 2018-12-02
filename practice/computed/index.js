import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name:{{firstName+ ' ' +lastName}}</p>
      <p>computed Name:{{name}}</p>
      <p>methods Name:{{getName()}}</p>
      <p>{{activeNum}}</p>
      <p><input type='text' v-model='activeNum'></p>
      <p>FirstName:<input type='text' v-model='firstName'></p>
      <p>LastName:<input type='text' v-model='lastName'></p>
      <p>FirstName:<input type='text' v-model='name2'></p>
      <p>FullName:{{fullName}}</p>
      <p>obj.a:<input type='text' v-model='obj.a'></p>
    </div>
  `,
  data: {
    firstName: 'zjy',
    lastName: 'zhong',
    activeNum: 0,
    fullName: '',
    // fullName2: ''
    obj: { a: 1 }
  },
  mounted() {
    this.obj = {
      a: 12
    }
  },
  computed: {
    name() {
      console.log('computed name invoked');
      return `${this.firstName} ${this.lastName}`;
    },
    name2: {
      get() {
        console.log('computed name2 get invoked');
        return `${this.firstName}`
      },
      set(name) {
        console.log('computed name2 set invoked');
        this.firstName = name
      }
    }
  },
  methods: {
    getName() {
      console.log('methods getName invoked');
      return `${this.firstName} ${this.lastName}`;
    }
  },
  watch: {
    // firstName(newName, oldName) { // eslint-disable-line
    //   this.fullName = `${newName} ${this.lastName}`
    // },
    firstName: {
      handler(newName, oldName) { // eslint-disable-line
        this.fullName = `${newName} ${this.lastName}`
      },
      immediate: true
    },
    'obj.a': {
      handler(newName, oldName) { // eslint-disable-line
        console.log('watch obj invoked')
      },
      immediate: true
      // deep: true
    }
  }

})
