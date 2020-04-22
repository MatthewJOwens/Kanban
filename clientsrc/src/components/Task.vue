<template>
  <div
    class="Task bg-dark text-white m-2 align-items-center text-left rounded p-2"
  >{{taskData.title}}</div>
</template>


<script>
//import Comment from "../components/Comment.vue"
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {};
  },
  computed: {
    // comments(){
    //   return this.$store.state.comments
    // }
  },
  methods: {},
  components: {
    //Comment
  }
};
</script>


<style scoped>
</style>