<template>
  <div class="comment">
    <div @mouseover="show=true" @mouseleave="show=false">
      {{commentData.body}}
      -{{commentData.creatorName}}
      <span
        @click="deleteComment()"
        v-show="show"
      >
        <small>
          <i class="far fa-trash-alt text-danger"></i>
        </small>
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {
      show: false
    };
  },
  computed: {},
  methods: {
    async deleteComment() {
      await this.$store.dispatch("deleteComment", this.commentData);
      this.$store.dispatch("getComments", this.commentData.taskId);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>