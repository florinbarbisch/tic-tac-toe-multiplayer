<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h3 class="text-center">Sign in to Tic-Tac-Toe</h3>
        <form @submit.prevent="onSubmit(username, password)">
          <div class="form-group">
            <label for="username">Username</label
            ><input
              type="text"
              class="border rounded-pill form-control"
              id="username"
              v-model="username"
              placeholder="Username"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label
            ><input
              type="password"
              class="border rounded-pill form-control"
              id="password"
              v-model="password"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary btn-block border rounded-pill"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
import ErrorHandler from "../common/error.handler";
import { SET_ERROR } from "@/store/mutations.type";

export default {
  data() {
    return {
      errorHandler: null,
      username: null,
      password: null
    };
  },
  mounted() {
    this.errorHandler = new ErrorHandler(this.$snack);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === SET_ERROR) {
        this.errorHandler.onErrorResponse(state.auth.errors);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  methods: {
    onSubmit(username, password) {
      this.$store
        .dispatch(LOGIN, { username, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>
