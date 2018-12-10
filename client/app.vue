<template>
  <div id="app">
    <div id="cover"></div>
    <Header>
      <!-- <span slot="count">{{count}}</span> -->
      <span slot="count">{{counter}}</span>
    </Header>
    <router-link to="/app">app</router-link>
    <!-- <router-link to="/app/111">app111</router-link> -->
    <router-link to="/login">login</router-link>
    <!-- <router-link to="/login/exact">login exact</router-link> -->
    <!-- <Todo></Todo> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <div class="fullname">{{fullName}}</div>
    <!-- <router-view name="login"></router-view> -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
// import Todo from "./views/todo/todo.vue";

export default {
  data() {
    return {};
  },
  components: {
    Header,
    // Todo,
    Footer
  },

  mounted() {
    // console.log("app route:", this.$route);
    console.log("app store:", this.$store);
    // this.$store.state.count = "none"; // 这样写虽然修改成功，但是会发出警告
    var n = 0;
    setInterval(() => {
      this.updateCount({
        num: ++n,
        num2: 3
      });
    }, 1000);
    // console.log(this.updateCountAsync);
    // this.updateCountAsync({
    //   num: 4,
    //   time: 3000
    // });
  },
  methods: {
    ...mapActions(["updateCountAsync"]),
    ...mapMutations(["updateCount"])
  },
  computed: {
    // ...mapState(["count"]),
    ...mapState({
      // counter: "count"
      counter: state => state.count
    }),
    ...mapGetters(["fullName"])
    // count() {
    //   return this.$store.state.count;
    // },
    // fullName() {
    //   return this.$store.getters.fullName;
    // }
  }
};
</script>
<style lang = 'stylus' scoped>
.fullname {
  color: #fff;
  font-size: 30px;
}

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
