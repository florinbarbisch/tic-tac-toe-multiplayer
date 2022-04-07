<template>
  <div class="container">
    <div class="row">
      <div
        class="col-sm-10 col-md-8 col-lg-6 col-xl-6 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-3 text-center"
      >
        <h3 class="text-center">
          Copy your Invite Link and send it to your Opponent
        </h3>
        <a :href="API_URL + '/multiplayer/play/' + currentMultiplayerGame._id">
          <span style="text-decoration: underline;">{{
            API_URL + "/multiplayer/play/" + currentMultiplayerGame._id
          }}</span></a
        >
        <a
          class="btn btn-primary btn-block text-center border rounded-pill"
          role="button"
          :href="API_URL + '/multiplayer/play/' + currentMultiplayerGame._id"
          >Continue to game!</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_MULTIPLAYER_GAME } from "@/store/actions.type";
import { API_URL } from "@/common/config";

export default {
  name: "CopyLink",
  computed: {
    ...mapGetters({
      currentMultiplayerGame: "currentMultiplayerGame"
    }),
    API_URL
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch(FETCH_MULTIPLAYER_GAME, to.params.gameId)
    ]).then(() => {
      next();
    });
  }
};
</script>

<style scoped></style>
