<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h4 class="text-center">
          Playing Multi-Player Game #{{ currentMultiplayerGame._id }}<br />
        </h4>
        <h6 class="text-center text-muted mb-2">
          Opponent:
          {{
            currentMultiplayerGame.opponent
              ? currentMultiplayerGame.opponent.username
              : "?"
          }}
        </h6>
        <board v-on:select="select" v-bind:game="currentMultiplayerGame"/>
        <h6
          class="text-center text-muted mb-2"
          v-if="currentMultiplayerGame.yourTurn"
        >
          It's your turn...
        </h6>
        <h6 class="text-center text-muted mb-2" v-else>
          Waiting for opponent...
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FETCH_MULTIPLAYER_GAME,
  MULTIPLAYER_GAME_UPDATE,
  MULTIPLAYER_MOVE
} from "@/store/actions.type";
import ErrorHandler from "@/common/error.handler";
import { SET_ERROR } from "@/store/mutations.type";
import io from "socket.io-client";
import Board from "@/components/Board"

export default {
  name: "PlayMultiplayer",
  components: { Board },
  data() {
    return {
      errorHandler: null
    };
  },
  computed: {
    ...mapGetters({
      currentMultiplayerGame: "currentMultiplayerGame",
      errors: "multiplayer.errors"
    })
  },
  mounted() {
    this.errorHandler = new ErrorHandler(this.$snack);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === SET_ERROR) {
        this.errorHandler.onErrorResponse(state.multiplayer.errors);
      }
    });
    this.socket = io("http://localhost:3000");
    this.socket.on("gameUpdate", data => {
      if (data.MultiplayerGame.winner === "Ongoing") {
        store.dispatch(MULTIPLAYER_GAME_UPDATE, data.MultiplayerGame);
      } else {
        this.$router.push({
          name: "multiplayer.result",
          params: { gameId: data.MultiplayerGame._id }
        });
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_MULTIPLAYER_GAME, to.params.gameId)
    ]).then(() => {
      next();
    });
  },
  methods: {
    select: function(cellId) {
      store.dispatch(MULTIPLAYER_MOVE, cellId).then(data => {
        if (data.MultiplayerGame.winner !== "Ongoing") {
          this.$router.push({
            name: "multiplayer.result",
            params: { gameId: data.MultiplayerGame._id }
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
