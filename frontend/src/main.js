import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarPlugin } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { CHECK_AUTH } from "./store/actions.type";
import ApiService from "./common/api.service";

import "./assets/styles.css";

Vue.config.productionTip = false;

Vue.use(NavbarPlugin);

Vue.use(VueSnackbar, { position: "bottom", time: 4000 });

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
);

router.beforeEach((to, from, next) => {
  if (
    to.name !== "signin" &&
    to.name !== "signup" &&
    !store.getters.isAuthenticated
  ) {
    next({ name: "signin" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
