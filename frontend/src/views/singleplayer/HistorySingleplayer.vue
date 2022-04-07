<template>
  <div class="container">
    <div>
      <h1>History of Single-Player Games</h1>
      <form v-if="singleplayerGames.length > 0">
        <div class="form-group">
          <div class="form-row">
            <div class="col-xl-2">
              <label class="col-form-label" for="difficulty">Difficulty</label>
            </div>
            <div class="col">
              <select
                class="border rounded-pill form-control"
                id="difficulty"
                v-model="difficulty"
              >
                <option value="">Select a difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Impossible">Impossible</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col" style="margin-bottom: 20px;"></div>
        </div>
      </form>
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table
              class="table table-striped"
              v-if="singleplayerGames.length > 0"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Difficulty</th>
                  <th>Result</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="game in singleplayerGames"
                  :key="game._id"
                  @click="navigate(game._id)"
                  style="cursor: pointer"
                >
                  <td>{{ game._id }}</td>
                  <td>{{ game.difficulty }}</td>
                  <td>{{ game.status }}</td>
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
import { FETCH_SINGLEPLAYER_GAMES } from "@/store/actions.type";
import NoResults from "@/components/NoResults";

export default {
  name: "SingleplayerHistory",
  components: { NoResults },
  data() {
    return {
      difficulty: null
    };
  },
  mounted() {
    this.difficulty = "";
  },
  computed: {
    ...mapGetters(["singleplayerGames"])
  },
  methods: {
    navigate(gameId) {
      this.$router.push({
        name: "singleplayer.result",
        params: { gameId: gameId }
      });
    }
  },
  watch: {
    difficulty: function() {
      let difficulty = this.difficulty;
      store.dispatch(FETCH_SINGLEPLAYER_GAMES, {
        difficulty: difficulty,
        status: "Finished"
      });
    }
  }
};
</script>

<style scoped></style>
