<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          <h1>Ongoing Single-Player Games</h1>
          <div class="table-responsive">
            <table
              class="table table-striped"
              v-if="singleplayerGames.length > 0"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Difficulty</th>
                  <th>Current Score</th>
                  <th>Continue</th>
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
                  <td>
                    <button
                      class="btn btn-primary border rounded-pill"
                      type="button"
                    >
                      Continue
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
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_SINGLEPLAYER_GAMES } from "@/store/actions.type";
import NoResults from "@/components/NoResults";

export default {
  name: "OngoingSingleplayer",
  components: { NoResults },
  computed: {
    ...mapGetters(["singleplayerGames"])
  },
  mounted() {
    store.dispatch(FETCH_SINGLEPLAYER_GAMES, {
      status: "Ongoing"
    });
  },
  methods: {
    navigate(gameId) {
      this.$router.push({
        name: "singleplayer.play",
        params: { gameId: gameId }
      });
    }
  }
};
</script>
