<template>
  <div class="container">
    <div>
      <h1>Ongoing Multi-Player Games</h1>
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Opponent</th>
                  <th>Current Score</th>
                  <th>Continue</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="game in multiplayerGames"
                  :key="game._id"
                  @click="navigate(game._id)"
                  style="cursor: pointer"
                >
                  <td>{{ game._id }}</td>
                  <td>{{ game.opponent ? game.opponent.username : "" }}</td>
                  <td>
                    <div class="boardWrapper">
                      <div class="boardSmall">
                        <div class="boardRow">
                          <div class="boardCell cell1">{{ game.cell1 }}</div>
                          <div class="boardCell cell2">{{ game.cell2 }}</div>
                          <div class="boardCell cell3">{{ game.cell3 }}</div>
                        </div>
                        <div class="boardRow">
                          <div class="boardCell cell4">{{ game.cell4 }}</div>
                          <div class="boardCell cell5">{{ game.cell5 }}</div>
                          <div class="boardCell cell6">{{ game.cell6 }}</div>
                        </div>
                        <div class="boardRow">
                          <div class="boardCell cell7">{{ game.cell7 }}</div>
                          <div class="boardCell cell8">{{ game.cell8 }}</div>
                          <div class="boardCell cell9">{{ game.cell9 }}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary border rounded-pill"
                      type="button"
                      :disabled="!game.yourTurn"
                    >
                      {{
                        game.yourTurn ? "Continue" : "Waiting for Opponent..."
                      }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { FETCH_MULTIPLAYER_GAMES } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "OngoingMultiplayer",
  mounted() {
    store.dispatch(FETCH_MULTIPLAYER_GAMES);
  },
  computed: {
    ...mapGetters(["multiplayerGames"])
  },
  methods: {
    navigate(gameId) {
      this.$router.push({
        name: "multiplayer.play",
        params: { gameId: gameId }
      });
    }
  }
};
</script>

<style scoped></style>
