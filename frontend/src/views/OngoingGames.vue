<template>
  <div>
    <OngoingSingleplayer />
    <OngoingMultiplayer />
  </div>
</template>

<script>
import OngoingSingleplayer from "@/views/singleplayer/OngoingSingleplayer";
import OngoingMultiplayer from "@/views/multiplayer/OngoingMultiplayer";
export default {
  name: "OngoingGames",
  components: { OngoingMultiplayer, OngoingSingleplayer }
};
</script>
