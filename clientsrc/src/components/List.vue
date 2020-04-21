<template>
  <div class="list p-2 mb-2 shadow rounded">
    <!-- <div class="col-3"></div> -->
    {{listData.title}}
    <Task v-for="task in tasks" :key="task.id" :taskData="task"></Task>
  </div>
</template>


<script>
import Task from "../components/Task.vue";
export default {
  name: "list",
  data() {
    return {};
  },
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  },
  methods: {},
  components: {
    Task
  }
};
</script>


<style scoped>
.list {
  min-width: 350px;
}
</style>