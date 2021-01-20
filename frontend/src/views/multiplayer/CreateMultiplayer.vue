<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h3 class="text-center">Create a Multi-Player Game</h3>
        <form @submit.prevent="onSubmit(inviteMode, opponent)">
          <div class="form-group">
            <label for="inviteMode"
              >How do you want to invite your Opponent?</label
            ><select
              class="border rounded-pill form-control"
              id="inviteMode"
              v-model="inviteMode"
            >
              <option value="random">Random Opponent</option>
              <option value="select">Select Opponent</option>
              <option value="link">Invite with Link</option>
            </select>
          </div>
          <div class="form-group" v-if="inviteMode === 'select'">
            <label for="opponent">Select Opponent</label
            ><select
              class="border rounded-pill form-control"
              id="opponent"
              v-model="opponent"
            >
              <option :value="user._id" v-for="user in users" :key="user._id">{{
                user.username
              }}</option>
            </select>
          </div>
          <button
            class="btn btn-primary btn-block border rounded-pill"
            type="submit"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { FETCH_USERS, MULTIPLAYER_GAME_CREATE } from "@/store/actions.type";
import ErrorHandler from "@/common/error.handler";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "CreateMultiplayer",
  data() {
    return {
      errorHandler: null,
      inviteMode: "select",
      opponent: null
    };
  },
  mounted() {
    this.errorHandler = new ErrorHandler(this.$snack);
    store.dispatch(FETCH_USERS);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setError") {
        this.errorHandler.onErrorResponse(state.multiplayer.errors);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  computed: {
    ...mapGetters(["users"])
  },
  methods: {
    onSubmit(inviteMode, opponent) {
      this.$store
        .dispatch(MULTIPLAYER_GAME_CREATE, {
          inviteMode: inviteMode,
          opponent: opponent
        })
        .then(data => {
          switch (inviteMode) {
            case "select":
              this.$router.push({
                name: "multiplayer.play",
                params: { gameId: data.MultiplayerGame._id }
              });
              break;
            case "link":
              this.$router.push({
                name: "multiplayer.copyInvite",
                params: { gameId: data.MultiplayerGame._id }
              });
              break;
          }
        });
    }
  }
};
</script>

<style scoped></style>
