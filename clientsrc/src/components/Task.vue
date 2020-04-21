<template>
  <div class="Task">{{taskData.title}}</div>
</template>


<script>
//import Comment from "../components/Comment.vue"
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {};
  },
  mounted() {},
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