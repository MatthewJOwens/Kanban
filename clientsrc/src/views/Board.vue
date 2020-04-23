<template>
<div class="bg-fuji fullheight">
  <div class="board">
    <!-- //TODO fix resizing issue with modal -->
    <h1 v-if="!editing" class="margin-board-top mb-3" ><span @click="editing = !editing">{{board.title}}</span></h1>
    <div v-else class="margin-board-top mb-3" >
      <input v-model="board.title" @keyup.enter="editBoardTitle()"/>
      <small>
        <span @click.stop="deleteBoard(board.id)" class="far fa-trash-alt text-danger"></span>
      </small>
    </div>
    <div class="d-flex flex-row items-start">
      <List class="bg-card" v-for="list in lists" :key="list.id" :listData="list">The list component has not loaded.</List>
      <div class="min-width-272 p-2 shadow rounded m-2 navy-font">
        <div v-if="showList">
          <input
            type="text"
            v-model="newList.title"
            placeholder="List title"
            @keyup.enter="addList()"
          />
        </div>
        <div class="" @click="showList = !showList" v-else>+ Add List</div>
      </div>
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
      this.newList.boardId = this.board.id;
      this.$store.dispatch("addList", this.newList);
      this.showList = false;
      newList.title = {}
    },
    editBoardTitle() {
      if (this.board.title == "") {this.board.title = "Untitled"}
      this.$store.dispatch("editBoardTitle", this.board);
      this.editing = false;
    },
    async deleteBoard(id) {
      let confirm = window.confirm("Are you sure you wish to delete?");
      if (confirm) {
        await this.$store.dispatch("deleteBoard", id);
        this.$router.push({ name: "boards" });
      }
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
.margin-board-top{
  padding-top: 15vh;
}
/* @onmouseover and v-show */
.bg-card {
  background-color: rgba(255, 255, 255, 0.5)!important;

}
.navy-font{
  color: #2c3e50;
    background-color: rgba(255, 255, 255, 0.5)!important;

}
</style>