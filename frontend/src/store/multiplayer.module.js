import Vue from "vue";
import { MultiplayerGamesService } from "@/common/api.service";
import {
  FETCH_MULTIPLAYER_GAME,
  MULTIPLAYER_GAME_CREATE,
  FETCH_MULTIPLAYER_GAMES,
  MULTIPLAYER_GAME_UPDATE,
  MULTIPLAYER_MOVE,
  FETCH_OPPONENTS
} from "./actions.type";
import {
  RESET_STATE,
  SET_MULTIPLAYER_GAMES,
  SET_ERROR,
  SET_MULTIPLAYER_GAME,
  SET_OPPONENTS
} from "./mutations.type";

const initialState = {
  currentMultiplayerGame: {
    _id: null,
    player: {
      username: null
    },
    opponent: {
      username: null
    },
    yourTurn: null,
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
  multiplayerGames: {},
  errors: null,
  opponents: {}
};

export const state = { ...initialState };

export const getters = {
  currentMultiplayerGame(state) {
    return state.currentMultiplayerGame;
  },
  multiplayerGames(state) {
    return state.multiplayerGames;
  },
  opponents(state) {
    return state.opponents;
  }
};

export const actions = {
  [MULTIPLAYER_GAME_CREATE](context, payload) {
    return new Promise((resolve, reject) => {
      MultiplayerGamesService.create(payload)
        .then(({ data }) => {
          context.commit(SET_MULTIPLAYER_GAME, data.MultiplayerGame);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [FETCH_MULTIPLAYER_GAME](context, gameId) {
    return new Promise((resolve, reject) => {
      MultiplayerGamesService.get(gameId)
        .then(({ data }) => {
          context.commit(SET_MULTIPLAYER_GAME, data.MultiplayerGame);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [FETCH_MULTIPLAYER_GAMES](context, opponent) {
    return new Promise((resolve, reject) => {
      MultiplayerGamesService.query(opponent)
        .then(({ data }) => {
          context.commit(SET_MULTIPLAYER_GAMES, data.multiplayerGames);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [FETCH_OPPONENTS](context) {
    return new Promise((resolve, reject) => {
      MultiplayerGamesService.getOpponents()
        .then(({ data }) => {
          context.commit(SET_OPPONENTS, data.opponents);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response);
          reject(response);
        });
    });
  },
  [MULTIPLAYER_GAME_UPDATE](context, game) {
    const currGame = state.currentMultiplayerGame;
    if (currGame._id === game._id && currGame.for._id === currGame.player._id) {
      context.commit(SET_MULTIPLAYER_GAME, game);
    }
  },
  [MULTIPLAYER_MOVE](context, cellId) {
    return new Promise((resolve, reject) => {
      MultiplayerGamesService.move(state.currentMultiplayerGame._id, cellId)
        .then(({ data }) => {
          context.commit(SET_MULTIPLAYER_GAME, data.MultiplayerGame);
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
  [SET_MULTIPLAYER_GAME](state, game) {
    state.currentMultiplayerGame = game;
  },
  [SET_MULTIPLAYER_GAMES](state, games) {
    state.multiplayerGames = games;
  },
  [SET_OPPONENTS](state, opponents) {
    state.opponents = opponents;
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
