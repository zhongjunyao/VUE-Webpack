// 相当于methods
export default {
  updateCount(state, { num, num2 }) {
    console.log('updateCount111 num2:', num2)
    state.count = num+1
  }
}
