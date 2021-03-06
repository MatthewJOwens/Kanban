import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: [],
    tempTask: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, tasks) {
      // state.tasks = tasks
      Vue.set(state.tasks, tasks.listId, tasks.data)
    },
    setComments(state, comments) {
      state.comments = comments
    },
    setTempTask(state, task) {
      state.tempTask = task
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        let res = await api.get('boards')
        {
          commit('setBoards', res.data)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async addBoard({ commit, dispatch }, boardData) {
      try {
        await api.post('boards', boardData)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    async getActiveBoard({ commit, dispatch }, board) {
      try {
        let res = await api.get('boards/' + board)
        commit('setActiveBoard', res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async editBoardTitle({ commit, dispatch }, board) {
      try {
        await api.put('boards/' + board.id, board)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        await api.delete("boards/" + boardId)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    async getLists({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("/boards/" + boardId + "/lists")
        commit("setLists", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    async addList({ commit, dispatch }, newList) {
      try {
        let res = await api.post("lists", newList)
        dispatch("getLists", newList.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    async editListTitle({ commit, dispatch }, listData) {
      try {
        await api.put('lists/' + listData.id, listData)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteList({ commit, dispatch }, listData) {
      try {
        await api.delete("lists/" + listData.id)
      } catch (error) {
        console.error(error)
      }
    },


    //#endregion

    //#region -- TASKS --
    async getTasks({ commit, dispatch }, listId) {
      try {
        let res = await api.get("/lists/" + listId + "/tasks")
        commit("setTasks", { data: res.data, listId: listId })
      } catch (err) {
        console.error(err)
      }
    },
    async addTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post("tasks", newTask)
        dispatch("getTasks", newTask.listId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask({ commit, dispatch }, taskData) {
      try {
        await api.delete("tasks/" + taskData.id)
      } catch (error) {
        console.error(error)
      }
    },
    async moveTask({ commit, dispatch }, object) {
      //find task we're moving
      //get id of list we're moving to out of the object and PUT task id with new list ID
      try {
        await api.put('tasks/' + object.id, object)
        dispatch('getTasks', object.listId)
        dispatch('getTasks', object.oldList)
      } catch (error) {
        console.error(error)
      }

    },
    //#endregion


    //#region -- COMMENTS --
    async getComments({ commit, dispatch }, taskId) {
      try {
        let res = await api.get('tasks/' + taskId + '/comments')
        console.log("comments", res.data)
        commit("setComments", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addComment({ commit, dispatch }, newComment) {
      let res = await api.post("comments", newComment)
      console.log("object??", newComment);
      dispatch("getComments", newComment.taskId)
    },
    async deleteComment({ commit, dispatch }, commentData) {
      try {
        await api.delete("comments/" + commentData.id)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion
  }
})
