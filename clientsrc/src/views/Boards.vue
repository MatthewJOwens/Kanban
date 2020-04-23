<template>
  <div class="container-fluid boards bg-fuji fullheight">
    <div class="row margin-board-top">
      <div class="col-md-2">
    <h3>Welcome, {{this.$auth.user.name}}</h3>
    <form @submit.prevent="addBoard">
      <input class="mb-2 text-center" type="text" placeholder="title" v-model="newBoard.title" required />
      <input class="mb-3 text-center" type="text" placeholder="description" v-model="newBoard.description" />
      <br>
      <button class="btn shadow p-1 btn-bg btn-create" type="submit">Create Board</button>
    </form>
    </div>
    <div class="col-md-1"></div>
    <div class="col-md-8">
      <div class="row">
    <div class="card p-0 m-2 col-md-3 bg-card" v-for="board in boards" :key="board.id" >

        <!-- <router-link :to="{name: 'board', params: {boardId: board.id}}">{{board.title}}</router-link> -->

  <div class="card-body p-0" @click="setActiveBoard(board)">
    <h5 class="card-title p-0"><strong>{{board.title}}</strong></h5>
    <p class="card-text p-0">{{board.description}}</p>

  </div>
</div>
</div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getProfile");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    profile() {
      return this.$store.state.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    setActiveBoard(board) {
      this.$store.commit("setActiveBoard", board);
      this.$router.push("boards/" + board.id)
    }
  }
};
</script>

<style>
.bg-card {
  background-color: rgba(255, 255, 255, 0.5);

}
.btn-create {
  font-weight: 600;
}
</style>
