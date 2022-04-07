<template>
  <div class="boardWrapper">
    <div :class="small?'boardSmall':'board'">
      <div class="boardRow">
        <div class="boardCell cell1" v-on:click="$emit('select', 0)">
          {{ game.cell1 }}
        </div>
        <div class="boardCell cell2" v-on:click="$emit('select', 1)">
          {{ game.cell2 }}
        </div>
        <div class="boardCell cell3" v-on:click="$emit('select', 2)">
          {{ game.cell3 }}
        </div>
      </div>
      <div class="boardRow">
        <div class="boardCell cell4" v-on:click="$emit('select', 3)">
          {{ game.cell4 }}
        </div>
        <div class="boardCell cell5" v-on:click="$emit('select', 4)">
          {{ game.cell5 }}
        </div>
        <div class="boardCell cell6" v-on:click="$emit('select', 5)">
          {{ game.cell6 }}
        </div>
      </div>
      <div class="boardRow">
        <div class="boardCell cell7" v-on:click="$emit('select', 6)">
          {{ game.cell7 }}
        </div>
        <div class="boardCell cell8" v-on:click="$emit('select', 7)">
          {{ game.cell8 }}
        </div>
        <div class="boardCell cell9" v-on:click="$emit('select', 8)">
          {{ game.cell9 }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "board",
  props: {
    small: false,
    game: {},
    select: {}
  }
};
</script>
