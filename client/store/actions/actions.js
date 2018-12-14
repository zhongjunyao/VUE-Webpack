// action 用于存放异步修改数据的代码
export default {
  updateCountAsync(store, data) {
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num,
        num2: 1
      })
    }, data.time)
  }
} 
