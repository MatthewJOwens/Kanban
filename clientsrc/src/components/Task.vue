<template>
  <div
    class="Task bg-navy text-white m-2 align-items-center text-left rounded p-2"
    @dragstart="startMove()"
  >
    <div
      @mouseover="show=true"
      @mouseleave="show=false"
      class="d-flex justify-content-between"
      data-toggle="modal"
      :data-target="'#taskModal-'+ taskData.id"
      @click="getComments()"
    >
      <div>
        <b>
          <small>{{taskData.title}}</small>
        </b>
      </div>
      <span @click.stop="deleteTask()" v-show="show">
        <small>
          <i class="far fa-trash-alt text-danger"></i>
        </small>
      </span>
    </div>
    <!-- Modal -->
    <div
      class="modal fade text-dark"
      :id="'taskModal-' + taskData.id"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">{{taskData.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{taskData.description}}</p>
            <br />
            <Comment v-for="comment in comments" :key="comment.id" :commentData="comment" />
            <input @keyup.enter="addComment()" v-model="newComment.body" class="w-100"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Comment from "../components/Comment.vue";
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      newComment: {},
      show: false
    };
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComments", this.taskData.id);
    },
    async addComment() {
      this.newComment.creatorName = this.$auth.user.name;
      // this.newComment.creatorEmail = this.$auth.user.email;
      this.newComment.taskId = this.taskData.id;
      console.log(this.newComment);
      await this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
      // this.getComments();
    },
    async deleteTask() {
      await this.$store.dispatch("deleteTask", this.taskData);
      this.$store.dispatch("getTasks", this.taskData.listId);
    },
    startMove() {
      this.$emit("dragstart");
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
.bg-navy {
  background-color: rgba(44, 62, 80, 0.7);
}
</style>