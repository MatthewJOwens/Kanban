<template>
  <div
    class="list p-2 shadow rounded bg-white m-2 h-100"
    @drop="moveTask($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div>
      <h6 v-if="!editing" @click="editing = true">
        <b>{{listData.title}}</b>
      </h6>
      <div v-else>
        <input type="text" width="20" @keyup.enter="editListTitle()" v-model="listData.title" />
        <small>
          <span @click.stop="deleteList()" class="far fa-trash-alt text-danger"></span>
        </small>
      </div>
    </div>
    <Task
      v-for="task in tasks"
      :key="task.id"
      :taskData="task"
      draggable
      @dragstart="pickupTask(task)"
    ></Task>
    <div>
      <input
        type="text"
        placeholder="+ Add task"
        class="w-100 rounded block py-0 m-0 bg-transparent text-center"
        v-model="newTask.title"
        @keyup.enter="addTask(listData.id)"
        @keyup.esc="toggleEditing()"
      />
    </div>
  </div>
</template>




<script>
import Task from "../components/Task.vue";
export default {
  name: "list",
  props: ["listData"],
  data() {
    return {
      newTask: {},
      editing: false,
      show: false,
      movedTask: {}
    };
  },
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasks", this.listData.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    },
    tempTask() {
      return this.$store.state.tempTask;
    }
  },
  methods: {
    addTask(listId) {
      this.newTask.listId = listId;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {};
    },
    editListTitle() {
      this.$store.dispatch("editListTitle", this.listData);
      this.editing = false;
    },
    async deleteList() {
      await this.$store.dispatch("deleteList", this.listData);
      this.$store.dispatch("getLists", this.listData.boardId);
    },
    pickupTask(task) {
      this.$store.commit("setTempTask", task);
    },
    moveTask(e) {
      //get id of task we're moving
      //find id of list we're moving to.

      //make object to PUT
      this.movedTask.oldList = this.tempTask.listId;
      this.movedTask.listId = this.listData.id;
      this.movedTask.id = this.tempTask.id;
      console.log("movedTask:", this.movedTask);
      //PUT object
      this.$store.dispatch("moveTask", this.movedTask);
    }
  },
  components: {
    Task
  }
};
</script>


<style scoped>
.list {
  min-width: 272px;
}
</style>