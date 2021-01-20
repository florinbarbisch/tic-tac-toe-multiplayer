import Vue from "vue";
import { SingleplayerGamesService } from "@/common/api.service";
import {
  SINGLEPLAYER_GAME_CREATE,
  FETCH_SINGLEPLAYER_GAME,
  FETCH_SINGLEPLAYER_GAMES,
  SINGLEPLAYER_MOVE
} from "./actions.type";
import {
  RESET_STATE,
  SET_SINGLEPLAYER_GAMES,
  SET_ERROR,
  SET_SINGLEPLAYER_GAME
} from "./mutations.type";

const initialState = {
  currentSingleplayerGame: {
    _id: "",
    player: {
      username: ""
    },
    status: "",
    difficulty: "",
    cell1: null,
    cell2: null,
    cell3: null,
    cell4: null,
    cell5: null,
    cell6: null,
    cell7: null,
    cell8: null,
    cell9: null
  },
  singleplayerGames: {},
  errors: null
};

export const state = { ...initialState };

export const getters = {
  currentSingleplayerGame(state) {
    return state.currentSingleplayerGame;
  },
  singleplayerGames(state) {
    return state.singleplayerGames;
  }
};

export const actions = {
  [SINGLEPLAYER_GAME_CREATE](context, difficulty) {
    return new Promise((resolve, reject) => {
      SingleplayerGamesService.create(difficulty)
        .then(({ data }) => {
          context.commit(SET_SINGLEPLAYER_GAME, data.SingleplayerGame);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [FETCH_SINGLEPLAYER_GAME](context, gameId) {
    return new Promise((resolve, reject) => {
      SingleplayerGamesService.get(gameId)
        .then(({ data }) => {
          context.commit(SET_SINGLEPLAYER_GAME, data.SingleplayerGame);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [FETCH_SINGLEPLAYER_GAMES](context, difficulty) {
    return new Promise((resolve, reject) => {
      SingleplayerGamesService.query(difficulty)
        .then(({ data }) => {
          context.commit(SET_SINGLEPLAYER_GAMES, data.singleplayerGames);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [SINGLEPLAYER_MOVE](context, cellId) {
    return new Promise((resolve, reject) => {
      SingleplayerGamesService.move(state.currentSingleplayerGame._id, cellId)
        .then(({ data }) => {
          context.commit(SET_SINGLEPLAYER_GAME, data.SingleplayerGame);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  }
};

export const mutations = {
  [SET_SINGLEPLAYER_GAME](state, game) {
    state.currentSingleplayerGame = game;
  },
  [SET_SINGLEPLAYER_GAMES](state, games) {
    state.singleplayerGames = games;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
