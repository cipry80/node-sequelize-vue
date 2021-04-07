<template>
  <b-container class="nav-container">
    <b-nav>
      <b-nav-item active to="/">Home</b-nav-item>
      <b-nav-item v-if="username" to="/admin">Admin</b-nav-item>
      <b-nav-item v-if="!username" to="/login">Login</b-nav-item>
      <b-nav-item v-if="!username" to="/register">Register</b-nav-item>
      <b-nav-item v-if="username" @click="handleLogout()">Logout</b-nav-item>
    </b-nav>
  </b-container>
</template>

<script>
import { bus } from "../main";

export default {
  name: "Header",
  props: { username: String },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      bus.$emit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-container ul {
  justify-content: center;
}
</style>
