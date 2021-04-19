<template>
  <div class="login">
    <h1>Login</h1>
    <b-form @submit="onSubmit" v-if="show">
      <p v-if="error">
        {{ error }}
      </p>
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          type="text"
          placeholder="Enter username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <div>
        Not register, go to: <router-link to="/register">Register</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import { bus } from "../main";

export default {
  name: "Login",
  props: {
    title: String,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      error: null,
      show: true,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          this.form
        );

        const token = data?.token;
        const { username } = jwt_decode(token);

        if (data) {
          localStorage.setItem("token", data?.token);
          localStorage.setItem("user", username);
          bus.$emit("login", username);
          this.$router.push("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          this.errors.push(data.message);
        }
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.error = err.response.data.message;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  max-width: 400px;
  margin: 0 auto;
}
</style>
