import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin.vue"),
    beforeEnter(to, form, next) {
      const username = localStorage.getItem("user");
      if (username) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
