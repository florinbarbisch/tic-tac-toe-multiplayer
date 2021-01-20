<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h3 class="text-center">Create your account</h3>
        <form @submit.prevent="onSubmit(username, password)">
          <div class="form-group">
            <label for="username">Username</label
            ><input
              class="border rounded-pill form-control"
              type="text"
              id="username"
              v-model="username"
              placeholder="Username"
              autofocus
              required
              minlength="3"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label
            ><input
              class="border rounded-pill form-control"
              type="password"
              id="password"
              v-model="password"
              required
              minlength="8"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary btn-block border rounded-pill"
              type="submit"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { REGISTER } from "@/store/actions.type";
import ErrorHandler from "../common/error.handler";
import { SET_ERROR } from "@/store/mutations.type";

export default {
  name: "Signup",
  data() {
    return {
      errorHandler: null,
      username: "",
      password: ""
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
    onSubmit() {
      this.$store
        .dispatch(REGISTER, {
          username: this.username,
          password: this.password
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>
