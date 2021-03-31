<template>
  <div class="login">
    <h1>Login</h1>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Username:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
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
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

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
      errors: [],
      show: true,
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          this.form
        );
        if (response) {
          this.$router.push("admin");
        } else {
          this.errors.push(response.message);
        }
      } catch (error) {
        this.errors.push(error);
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
