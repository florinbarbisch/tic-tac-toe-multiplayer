<template>
  <div id="app">
    <div class="container">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand to="/">Tic-Tac-Toe</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-end">
          <b-navbar-nav>
            <b-nav-item to="/signin" v-if="!isAuthenticated"
              >Sign in</b-nav-item
            >
            <b-nav-item to="/signup" v-if="!isAuthenticated"
              >Sign up</b-nav-item
            >
            <b-nav-item-dropdown
              text="Single-Player Games"
              v-if="isAuthenticated"
            >
              <b-dropdown-item to="/singleplayer/ongoing"
                >Ongoing</b-dropdown-item
              >
              <b-dropdown-item to="/singleplayer/create">New</b-dropdown-item>
              <b-dropdown-item to="/singleplayer/history"
                >History</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              text="Multi-Player Games"
              v-if="isAuthenticated"
            >
              <b-dropdown-item to="/multiplayer/ongoing"
                >Ongoing</b-dropdown-item
              >
              <b-dropdown-item to="/multiplayer/create">New</b-dropdown-item>
              <b-dropdown-item to="/multiplayer/history"
                >History</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              :text="currentUser.username"
              v-if="isAuthenticated"
            >
              <b-dropdown-item to="/home">Ongoing Games</b-dropdown-item>
              <b-dropdown-item @click="onSignout()">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="row m-3">
        <div class="col-12" style="overflow: auto">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.type";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"])
  },
  methods: {
    onSignout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "home" });
      });
    }
  }
};
</script>

<style></style>
