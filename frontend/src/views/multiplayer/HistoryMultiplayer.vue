<template>
  <div class="container">
    <div>
      <h1>History of Multi-Player Games</h1>
      <form>
        <div class="form-group">
          <div class="form-row">
            <div class="col-xl-2">
              <label class="col-form-label" for="opponent">Opponent</label>
            </div>
            <div class="col">
              <select
                class="border rounded-pill form-control"
                id="opponent"
                v-model="opponent"
                v-if="opponents.length > 0"
              >
                <option value="">Select an opponent</option>
                <option
                  :value="opponent._id"
                  v-for="opponent in opponents"
                  :key="opponent._id"
                >
                  {{ opponent.username }}
                </option>
              </select>
              <select
                class="border rounded-pill form-control"
                id="opponent"
                disabled
                v-model="opponent"
                v-else
              >
                <option value="">No opponents found</option>
              </select>
            </div>
          </div>
        </div>
      </form>
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
                  <th>Result</th>
                  <th>Score</th>
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
                  <td>{{ game.opponent.username }}</td>
                  <td>{{ game.statusText }}</td>
                  <td>
                    <board :small="true" v-bind:game="game"/>
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
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_MULTIPLAYER_GAMES, FETCH_OPPONENTS } from "@/store/actions.type";
import NoResults from "@/components/NoResults";
import Board from "@/components/Board";

export default {
  name: "HistoryMultiplayer",
  components: { NoResults, Board },
  data() {
    return {
      opponent: null
    };
  },
  mounted() {
    this.opponent = "";
    store.dispatch(FETCH_OPPONENTS);
  },
  computed: {
    ...mapGetters(["multiplayerGames", "opponents"])
  },
  methods: {
    navigate(gameId) {
      this.$router.push({
        name: "multiplayer.result",
        params: { gameId: gameId }
      });
    }
  },
  watch: {
    opponent: function() {
      let opponent = this.opponent;
      store.dispatch(FETCH_MULTIPLAYER_GAMES, {
        opponent: opponent,
        status: "Finished"
      });
    }
  }
};
</script>
