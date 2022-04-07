<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-6 offset-xl-3 text-center">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">
              Multi-Player Game #{{ currentMultiplayerGame._id }}<br />
            </h4>
            <h4 class="text-center text-muted mb-2">
              Opponent: {{ currentMultiplayerGame.opponent.username }}
            </h4>
            <h6 class="text-center text-muted mb-2">
              {{ currentMultiplayerGame.statusText }}
            </h6>
            <board v-bind:game="currentMultiplayerGame" />
            <button
              class="btn btn-primary btn-block text-center border rounded-pill"
              type="button"
              @click="playAgain(currentMultiplayerGame.opponent._id)"
            >
              Revenge!
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
  FETCH_MULTIPLAYER_GAME,
  MULTIPLAYER_GAME_CREATE
} from "@/store/actions.type";
import Board from "@/components/Board";

export default {
  name: "ResultMultiplayer",
  components: { Board },
  computed: {
    ...mapGetters(["currentMultiplayerGame"])
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_MULTIPLAYER_GAME, to.params.gameId)
    ]).then(() => {
      next();
    });
  },
  methods: {
    playAgain(opponent) {
      this.$store
        .dispatch(MULTIPLAYER_GAME_CREATE, {
          inviteMode: "select",
          opponent: opponent
        })
        .then(data => {
          this.$router.push({
            name: "multiplayer.play",
            params: { gameId: data.MultiplayerGame._id }
          });
        });
    }
  }
};
</script>

<style scoped></style>
