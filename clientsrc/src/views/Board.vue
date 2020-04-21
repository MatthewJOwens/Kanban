<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <div class="d-flex flex-row items-start">
      <List
        v-for="list in lists"
        :key="list.id"
        :listData="list"
      >The list component has not loaded.</List>
      <div v-if="showList">
        <input type="text" v-model="newList.title" placeholder="List title" />
        <button class="btn btn-primary" @submit.prevent="addList()">Submit</button>
      </div>
      <div v-else @click="showList = !showList">Add List
      </div>
      <p>{{lists}}</p>
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
      newList: {}
    };
  },
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    profile() {
      return this.$store.state.user;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  created() {
    this.$store.dispatch("getProfile");
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  methods: {
    addList() {
      // TODO Finish writing method to add Column after writing back end
      // this.newColumn.
      this.$store.dispatch("addList", this.newList);
      // TODO need to add to store
    }
  },
  props: ["boardId"],
  components: {
    List
  }
};
</script>
