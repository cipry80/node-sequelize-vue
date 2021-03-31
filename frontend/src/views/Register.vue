<template>
  <div class="register">
    <h1>Register Page</h1>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.username"
          name="username"
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
          name="password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Your email:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.email"
          name="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Your Age:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.age"
          name="age"
          type="number"
          placeholder="Enter your age"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Your gender:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.gender"
          name="gender"
          type="text"
          placeholder="Enter your gender"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        age: "",
        gender: "",
      },
      errors: [],
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      console.log(this.form);
      try {
        await axios.post(
          `http://localhost:3000/api/v1/users/register`,
          this.form
        );
        this.$router.push("/login");
      } catch (e) {
        this.errors.push(e);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.register {
  max-width: 400px;
  margin: 0 auto;
}
</style>
