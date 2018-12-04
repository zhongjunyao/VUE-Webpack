<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/app/zjy">app</router-link>
    <router-link to="/login">login</router-link>
    <!-- <router-link to="/login/exact">login exact</router-link> -->
    <!-- <Todo></Todo> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <router-view name="login"></router-view>
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
  },
  mounted() {
    console.log("route:", this.$route);
  }
};
</script>
<style lang = 'stylus' scoped>
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-active {
  transition: all 0.5s 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translateY(10px);
  opacity: 0;
}

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
