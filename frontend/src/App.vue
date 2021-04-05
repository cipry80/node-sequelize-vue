<template>
  <div id="app">
    <app-header :username="username"></app-header>
    <router-view />
  </div>
</template>

<script>
import Header from "../src/components/Header.vue";
import { bus } from "./main";

export default {
  name: "App",
  components: { "app-header": Header },
  data() {
    return {
      username: null,
    };
  },
  created() {
    const username = localStorage.getItem("user");
    this.username = username;
    bus.$on("logout", () => {
      this.username = null;
    });

    bus.$on("login", (data) => {
      this.username = data;
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
