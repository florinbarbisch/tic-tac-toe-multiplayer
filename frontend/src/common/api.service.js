import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
  },
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  get(resource, id = "") {
    return Vue.axios.get(`${resource}/${id}`).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, id, params) {
    return Vue.axios.put(`${resource}/${id}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`ApiService ${error}`);
    });
  }
};

export default ApiService;

export const SingleplayerGamesService = {
  get(id) {
    return ApiService.get("singleplayergames", id);
  },
  query(params) {
    return ApiService.query("singleplayergames", {
      params: params
    });
  },
  create(difficulty) {
    return ApiService.post("singleplayergames", difficulty);
  },
  move(id, cellId) {
    return ApiService.post("singleplayergames/" + id + "/move", {
      cell: cellId
    });
  }
};

export const MultiplayerGamesService = {
  get(id) {
    return ApiService.get("multiplayergames", id);
  },
  getOpponents() {
    return ApiService.get("multiplayergames/opponents");
  },
  query(params) {
    return ApiService.query("multiplayergames", {
      params: params
    });
  },
  create(payload) {
    return ApiService.post("multiplayergames", payload);
  },
  move(id, cellId) {
    return ApiService.post("multiplayergames/" + id + "/move", {
      cell: cellId
    });
  }
};
