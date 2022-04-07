<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-6 offset-xl-3 text-center">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">
              Single-Player Game #{{ currentSingleplayerGame._id }}<br />
            </h4>
            <h6 class="text-center text-muted mb-2">
              Difficulty: {{ currentSingleplayerGame.difficulty }}
            </h6>
            <h4 class="text-center text-muted mb-2">
              {{ currentSingleplayerGame.status }}
            </h4>
            <board v-bind:game="currentSingleplayerGame" />
            <button
              class="btn btn-primary btn-block text-center border rounded-pill"
              type="button"
              @click="playAgain(currentSingleplayerGame.difficulty)"
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {
  FETCH_SINGLEPLAYER_GAME,
  SINGLEPLAYER_GAME_CREATE
} from "@/store/actions.type";
import Board from "@/components/Board";

export default {
  name: "ResultSingleplayer",
  components: { Board },
  computed: {
    ...mapGetters(["currentSingleplayerGame"])
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_SINGLEPLAYER_GAME, to.params.gameId)
    ]).then(() => {
      next();
    });
  },
  methods: {
    playAgain(difficulty) {
      this.$store
        .dispatch(SINGLEPLAYER_GAME_CREATE, { difficulty })
        .then(data => {
          this.$router.push({
            name: "singleplayer.play",
            params: { gameId: data.SingleplayerGame._id }
          });
        });
    }
  }
};
</script>

<style scoped></style>
