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
    comments: []
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

    //#endregion


    //#region -- COMMENTS --

    //#endregion
  }
})
