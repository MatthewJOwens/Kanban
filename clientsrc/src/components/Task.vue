<template>
  <div
    class="Task bg-dark text-white m-2 align-items-center text-left rounded p-2"
    @click="getComments()"
    data-toggle="modal"
    :data-target="'#taskModal-'+ taskData.id"
  >
    {{taskData.title}}
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
    return {};
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    getComments() {
      this.$store.dispatch("getComments", this.taskData);
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>