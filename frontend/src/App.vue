<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import Header from "../src/components/Header.vue";

export default {
  name: "App",
  components: { "app-header": Header },
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
