<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <p>{{board}}</p>
    <p>This is a board.</p>
  </div>
</template>

<script>
export default {
  name: "board",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    profile() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$store.dispatch("getProfile");
  },
  props: ["boardId"]
};
</script>
