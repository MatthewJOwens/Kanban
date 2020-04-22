<template>
  <div class="board">
    <!-- //TODO fix resizing issue with modal -->
    <h1 v-if="board.title && !editing" @click="editing = !editing">{{board.title}}</h1>
    <div v-else-if="board.title && editing">
      <input v-model="board.title" @keyup.enter="editBoardTitle()" />
      <button class="btn btn-success" @click="editBoardTitle()">OK</button>
    </div>
    <h1 v-else>Loading...</h1>
    <div class="d-flex flex-row items-start">
      <List v-for="list in lists" :key="list.id" :listData="list">The list component has not loaded.</List>
      <div class="min-width-272 p-2 shadow rounded bg-white m-2">
        <div v-if="showList">
          <input
            type="text"
            v-model="newList.title"
            placeholder="List title"
            @keyup.enter="addList()"
          />
        </div>
        <div @click="showList = !showList" v-else>+ Add List</div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
export default {
  name: "board",
  data() {
    return {
      showList: false,
      newList: {},
      editing: false
    };
  },
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    // profile() {
    //   return this.$store.state.user;
    // },
    lists() {
      return this.$store.state.lists;
    }
  },
  created() {
    // this.$store.dispatch("getProfile");
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
  },
  mounted() {
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  methods: {
    addList() {
      // TODO Finish writing method to add Column after writing back end
      this.newList.boardId = this.board.id;
      this.$store.dispatch("addList", this.newList);
      this.showList = false;
      // TODO need to add to store
    },
    editBoardTitle() {
      this.$store.dispatch("editBoardTitle", this.board);
      this.editing = false;
    }
  },
  props: ["boardId"],
  components: {
    List
  }
};
</script>
<style>
.min-width-272 {
  min-width: 272px;
  height: 100%;
}
/* @onmouseover and v-show */
</style>