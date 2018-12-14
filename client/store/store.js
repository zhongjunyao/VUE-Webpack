import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store =  new Vuex.Store({
    // strict严格规定在外部只能通过mutations的方法修改值,this.$store.state.count = newVal 无效
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins:[
      (store)=>{ // eslint-disable-line
        console.log('my plugins invoked')
      }
    ]
    // modules:{
    //   a:{
    //     namespaced:true,
    //     state:{
    //       text:1
    //     },
    //     mutations:{
    //       plusText(state,){
    //         console.log('modules a updateText state:',state)
    //         state.text++;
    //       },
    //       subText(state){
    //         console.log('modules a updateText state:',state)
    //         state.text--;
    //       }
    //     },
    //     getters:{
    //       textPlus(state,getters,rootState){
    //         console.log('getters textPlus invoked :',state.text + rootState.count,state,getters,rootState)
    //         return state.text + rootState.count
    //       }
    //     },
    //     actions:{
    //       add({state,commit,rootState}){//eslint-disable-line
    //         commit('plusText')
    //       }
    //     }
    //   },
    //   b:{
    //     state:{
    //       text:2
    //     }
    //   }
    // }
  })
  if(module.hot){
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ],()=>{
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state:newState,
        mutations:newMutations,
        getters:newGetters,
        actions:newActions
      })
    })
  }
  return store
}
