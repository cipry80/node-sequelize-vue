<template>
  <b-container>
    <b-nav>
      <b-nav-item active to="/">Home</b-nav-item>
      <b-nav-item to="/admin">Admin</b-nav-item>
      <b-nav-item to="/login">Login</b-nav-item>
      <b-nav-item to="/register">Register</b-nav-item>
    </b-nav>
  </b-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Header",
};
</script>
