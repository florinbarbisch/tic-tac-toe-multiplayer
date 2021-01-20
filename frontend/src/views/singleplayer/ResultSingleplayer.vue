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
            <h6 class="text-center text-muted mb-2">
              {{ currentSingleplayerGame.status }}
            </h6>
            <div class="boardWrapper">
              <div class="board">
                <div class="boardRow">
                  <div class="boardCell cell1">
                    {{ currentSingleplayerGame.cell1 }}
                  </div>
                  <div class="boardCell cell2">
                    {{ currentSingleplayerGame.cell2 }}
                  </div>
                  <div class="boardCell cell3">
                    {{ currentSingleplayerGame.cell3 }}
                  </div>
                </div>
                <div class="boardRow">
                  <div class="boardCell cell4">
                    {{ currentSingleplayerGame.cell4 }}
                  </div>
                  <div class="boardCell cell5">
                    {{ currentSingleplayerGame.cell5 }}
                  </div>
                  <div class="boardCell cell6">
                    {{ currentSingleplayerGame.cell6 }}
                  </div>
                </div>
                <div class="boardRow">
                  <div class="boardCell cell7">
                    {{ currentSingleplayerGame.cell7 }}
                  </div>
                  <div class="boardCell cell8">
                    {{ currentSingleplayerGame.cell8 }}
                  </div>
                  <div class="boardCell cell9">
                    {{ currentSingleplayerGame.cell9 }}
                  </div>
                </div>
              </div>
            </div>
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

export default {
  name: "ResultSingleplayer",
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
