<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h4 class="text-center">
          Playing Single-Player Game #{{ currentMultiplayerGame._id }}<br />
        </h4>
        <h6 class="text-center text-muted mb-2">
          Opponent:
          {{
            currentMultiplayerGame.opponent
              ? currentMultiplayerGame.opponent.username
              : "?"
          }}
        </h6>
        <div class="boardWrapper">
          <div class="board">
            <div class="boardRow">
              <div class="boardCell cell1" v-on:click="select(0)">
                {{ currentMultiplayerGame.cell1 }}
              </div>
              <div class="boardCell cell2" v-on:click="select(1)">
                {{ currentMultiplayerGame.cell2 }}
              </div>
              <div class="boardCell cell3" v-on:click="select(2)">
                {{ currentMultiplayerGame.cell3 }}
              </div>
            </div>
            <div class="boardRow">
              <div class="boardCell cell4" v-on:click="select(3)">
                {{ currentMultiplayerGame.cell4 }}
              </div>
              <div class="boardCell cell5" v-on:click="select(4)">
                {{ currentMultiplayerGame.cell5 }}
              </div>
              <div class="boardCell cell6" v-on:click="select(5)">
                {{ currentMultiplayerGame.cell6 }}
              </div>
            </div>
            <div class="boardRow">
              <div class="boardCell cell7" v-on:click="select(6)">
                {{ currentMultiplayerGame.cell7 }}
              </div>
              <div class="boardCell cell8" v-on:click="select(7)">
                {{ currentMultiplayerGame.cell8 }}
              </div>
              <div class="boardCell cell9" v-on:click="select(8)">
                {{ currentMultiplayerGame.cell9 }}
              </div>
            </div>
          </div>
        </div>
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

export default {
  name: "PlayMultiplayer",
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
