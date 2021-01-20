import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "home"
    },
    {
      name: "home",
      path: "/home",
      component: () => import("@/views/OngoingGames")
    },
    {
      name: "signin",
      path: "/signin",
      component: () => import("@/views/Signin")
    },
    {
      name: "signup",
      path: "/signup",
      component: () => import("@/views/Signup")
    },
    // singleplayer
    {
      path: "/singleplayer",
      redirect: "/singleplayer/ongoing"
    },
    {
      name: "singleplayer.ongoing",
      path: "/singleplayer/ongoing",
      component: () => import("@/views/singleplayer/OngoingSingleplayer")
    },
    {
      name: "singleplayer.create",
      path: "/singleplayer/create",
      component: () => import("@/views/singleplayer/CreateSingleplayer")
    },
    {
      name: "singleplayer.play",
      path: "/singleplayer/play/:gameId",
      component: () => import("@/views/singleplayer/PlaySingleplayer")
    },
    {
      name: "singleplayer.result",
      path: "/singleplayer/result/:gameId",
      component: () => import("@/views/singleplayer/ResultSingleplayer")
    },
    {
      name: "singleplayer.history",
      path: "/singleplayer/history",
      component: () => import("@/views/singleplayer/HistorySingleplayer")
    },
    // multiplayer
    {
      path: "/multiplayer",
      redirect: "/multiplayer/ongoing"
    },
    {
      name: "multiplayer.ongoing",
      path: "/multiplayer/ongoing",
      component: () => import("@/views/multiplayer/OngoingMultiplayer")
    },
    {
      name: "multiplayer.create",
      path: "/multiplayer/create",
      component: () => import("@/views/multiplayer/CreateMultiplayer")
    },
    {
      name: "multiplayer.copyInvite",
      path: "/multiplayer/copyInvite/:gameId",
      component: () => import("@/views/multiplayer/CopyInvite")
    },
    {
      name: "multiplayer.acceptInvite",
      path: "/multiplayer/acceptInvite/:gameId",
      component: () => import("@/views/multiplayer/AcceptInvite")
    },
    {
      name: "multiplayer.play",
      path: "/multiplayer/play/:gameId",
      component: () => import("@/views/multiplayer/PlayMultiplayer")
    },
    {
      name: "multiplayer.result",
      path: "/multiplayer/result/:gameId",
      component: () => import("@/views/multiplayer/ResultMultiplayer")
    },
    {
      name: "multiplayer.history",
      path: "/multiplayer/history",
      component: () => import("@/views/multiplayer/HistoryMultiplayer")
    }
  ]
});

export default router;
