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
                  <td>{{ game.difficulty }}</td>
                  <td>
                    <board :small="true" v-bind:game="game"/>
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
import Board from "@/components/Board";

export default {
  name: "OngoingSingleplayer",
  components: { NoResults, Board },
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
