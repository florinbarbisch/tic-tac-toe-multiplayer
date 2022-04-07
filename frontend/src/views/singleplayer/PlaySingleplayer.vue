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
        <board v-on:select="select" v-bind:game="currentSingleplayerGame"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import store from "@/store";
import {FETCH_SINGLEPLAYER_GAME, SINGLEPLAYER_MOVE} from "@/store/actions.type";
import ErrorHandler from "@/common/error.handler";
import {SET_ERROR} from "@/store/mutations.type";
import Board from "@/components/Board";

export default {
  name: "PlaySingleplayer",
  components: { Board },
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
