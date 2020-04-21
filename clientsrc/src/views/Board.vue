<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <div class="d-flex flex-row items-start">
      <Column
        v-for="column in columns"
        :key="column.id"
        :columnData="column"
      >The column component has not loaded.</Column>
      <div v-if="showColumn">
        <input type="text" v-model="newColumn.title" placeholder="Column title" />
      </div>
      <div v-else @click="showColumn = !showColumn">
        <p>Add Column</p>
        <button class="btn btn-primary" @submit.prevent="addColumn()" />
      </div>
    </div>
  </div>
</template>

<script>
import Column from "../components/Column.vue";
export default {
  name: "board",
  data() {
    return {
      showColumn: false,
      newColumn: {}
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
    newColumn() {
      // TODO Finish writing method to add Column after writing back end
      // this.newColumn.
      this.$store.dispatch("addColumn", this.newColumn);
      // TODO need to add to store
    }
  },
  props: ["boardId"],
  components: {
    Column
  }
};
</script>
