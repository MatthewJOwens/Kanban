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
      </div>
      <div v-else @click="showList = !showList">
        <p>Add List</p>
        <button class="btn btn-primary" @submit.prevent="addList()" />
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
    }
  },
  created() {
    this.$store.dispatch("getProfile");
  },
  methods: {
    newList() {
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
