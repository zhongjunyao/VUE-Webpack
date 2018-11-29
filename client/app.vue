<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import Todo from "./views/todo/todo.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Todo,
    Footer
  }
};
</script>
<style lang = 'stylus' scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  #cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: -1;
  }
}
</style>
