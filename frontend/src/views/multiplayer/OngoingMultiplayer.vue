<template>
  <div class="container">
    <div>
      <h1>Ongoing Multi-Player Games</h1>
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table
              class="table table-striped"
              v-if="multiplayerGames.length > 0"
            >
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
                    <board :small="true" v-bind:game="game"/>
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
            <NoResults v-else />
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
import NoResults from "@/components/NoResults";
import Board from "@/components/Board";

export default {
  name: "OngoingMultiplayer",
  components: { NoResults, Board },
  mounted() {
    store.dispatch(FETCH_MULTIPLAYER_GAMES, {
      status: "Ongoing"
    });
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
