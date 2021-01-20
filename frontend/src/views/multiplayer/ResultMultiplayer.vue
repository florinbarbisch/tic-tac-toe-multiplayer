<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-6 offset-xl-3 text-center">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">
              Multi-Player Game #{{ currentMultiplayerGame._id }}<br />
            </h4>
            <h6 class="text-center text-muted mb-2">
              Opponent: {{ currentMultiplayerGame.opponent.username }}
            </h6>
            <div class="boardWrapper">
              <div class="board">
                <div class="boardRow">
                  <div class="boardCell cell1">
                    {{ currentMultiplayerGame.cell1 }}
                  </div>
                  <div class="boardCell cell2">
                    {{ currentMultiplayerGame.cell2 }}
                  </div>
                  <div class="boardCell cell3">
                    {{ currentMultiplayerGame.cell3 }}
                  </div>
                </div>
                <div class="boardRow">
                  <div class="boardCell cell4">
                    {{ currentMultiplayerGame.cell4 }}
                  </div>
                  <div class="boardCell cell5">
                    {{ currentMultiplayerGame.cell5 }}
                  </div>
                  <div class="boardCell cell6">
                    {{ currentMultiplayerGame.cell6 }}
                  </div>
                </div>
                <div class="boardRow">
                  <div class="boardCell cell7">
                    {{ currentMultiplayerGame.cell7 }}
                  </div>
                  <div class="boardCell cell8">
                    {{ currentMultiplayerGame.cell8 }}
                  </div>
                  <div class="boardCell cell9">
                    {{ currentMultiplayerGame.cell9 }}
                  </div>
                </div>
              </div>
            </div>
            <h6 class="text-center text-muted mb-2">
              {{ currentMultiplayerGame.statusText }}
            </h6>
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

export default {
  name: "ResultMultiplayer",
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
