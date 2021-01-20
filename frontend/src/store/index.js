import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import singleplayer from "./singleplayer.module";
import multiplayer from "./multiplayer.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    singleplayer,
    multiplayer,
    auth
    //article,
    //profile
  }
});
