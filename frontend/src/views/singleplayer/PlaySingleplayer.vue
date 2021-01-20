<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3"
      >
        <h4 class="text-center">
          Playing Single-Player Game #{{ currentSingleplayerGame._id }}<br />
        </h4>
        <h6 class="text-center text-muted mb-2">
          Difficulty: {{ currentSingleplayerGame.difficulty }}
        </h6>
        <div class="boardWrapper">
          <div class="board">
            <div class="boardRow">
              <div class="boardCell cell1" v-on:click="select(0)">
                {{ currentSingleplayerGame.cell1 }}
              </div>
              <div class="boardCell cell2" v-on:click="select(1)">
                {{ currentSingleplayerGame.cell2 }}
              </div>
              <div class="boardCell cell3" v-on:click="select(2)">
                {{ currentSingleplayerGame.cell3 }}
              </div>
            </div>
            <div class="boardRow">
              <div class="boardCell cell4" v-on:click="select(3)">
                {{ currentSingleplayerGame.cell4 }}
              </div>
              <div class="boardCell cell5" v-on:click="select(4)">
                {{ currentSingleplayerGame.cell5 }}
              </div>
              <div class="boardCell cell6" v-on:click="select(5)">
                {{ currentSingleplayerGame.cell6 }}
              </div>
            </div>
            <div class="boardRow">
              <div class="boardCell cell7" v-on:click="select(6)">
                {{ currentSingleplayerGame.cell7 }}
              </div>
              <div class="boardCell cell8" v-on:click="select(7)">
                {{ currentSingleplayerGame.cell8 }}
              </div>
              <div class="boardCell cell9" v-on:click="select(8)">
                {{ currentSingleplayerGame.cell9 }}
              </div>
            </div>
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
  SINGLEPLAYER_MOVE
} from "@/store/actions.type";
import ErrorHandler from "@/common/error.handler";
import { SET_ERROR } from "@/store/mutations.type";

export default {
  name: "PlaySingleplayer",
  data() {
    return {
      errorHandler: null
    };
  },
  computed: {
    ...mapGetters(["currentSingleplayerGame"])
  },
  mounted() {
    this.errorHandler = new ErrorHandler(this.$snack);
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === SET_ERROR) {
        this.errorHandler.onErrorResponse(state.singleplayer.errors);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_SINGLEPLAYER_GAME, to.params.gameId)
    ]).then(() => {
      next();
    });
  },
  methods: {
    select: function(cellId) {
      store.dispatch(SINGLEPLAYER_MOVE, cellId).then(data => {
        if (data.SingleplayerGame.status !== "Ongoing") {
          this.$router.push({
            name: "singleplayer.result",
            params: { gameId: data.SingleplayerGame._id }
          });
        }
      });
    }
  }
};
</script>

<style scoped></style>
