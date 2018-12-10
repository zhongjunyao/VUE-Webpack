import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  return new Vuex.Store({
    // strict严格规定在外部只能通过mutations的方法修改值,this.$store.state.count = newVal 无效
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
