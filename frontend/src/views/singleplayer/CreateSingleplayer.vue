<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h3 class="text-center">Create a Single-Player Game</h3>
        <form @submit.prevent="onSubmit(difficulty)">
          <div class="form-group">
            <label for="difficulty">Difficulty</label
            ><select
              class="border rounded-pill form-control"
              id="difficulty"
              v-model="difficulty"
              required
            >
              <option value="">Select a difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Impossible">Impossible</option>
            </select>
          </div>
          <button
            class="btn btn-primary btn-block border rounded-pill"
            type="submit"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SINGLEPLAYER_GAME_CREATE } from "@/store/actions.type";
import ErrorHandler from "@/common/error.handler";

export default {
  name: "CreateSingleplayerGame",
  data() {
    return {
      errorHandler: null,
      difficulty: ""
    };
  },
  mounted() {
    this.errorHandler = new ErrorHandler(this.$snack);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setError") {
        this.errorHandler.onErrorResponse(state.singleplayer.errors);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  computed: {
    ...mapGetters(["singleplayer.game"])
  },
  methods: {
    onSubmit(difficulty) {
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
