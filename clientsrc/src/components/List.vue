<template>
  <div class="list p-2 shadow rounded bg-white m-2">
    <!-- <div class="col-3"></div> -->
    {{listData.title}}
    <Task v-for="task in tasks" :key="task.id" :taskData="task"></Task>
    <div>
      <input
        type="text"
        placeholder="+ Add task"
        class="w-100 rounded block py-0 m-0 bg-transparent text-center"
      />
    </div>
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
  min-width: 272px;
  height: 100%;
}
</style>