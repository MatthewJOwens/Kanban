<template>
  <div class="comment">
    {{commentData.body}}
    -{{commentData.creatorName}}
    <button
      class="btn btn-warning btn-sm"
      type="button"
      @click="deleteComment()"
    />
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {};
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