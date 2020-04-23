<template>
  <nav class="navbar navbar-expand-lg bg-nav">
    <div class="container-fluid">
    <h1 class="navbar-brand kanji m-0 p-0">看板</h1>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li v-if="!this.$auth.isAuthenticated" class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link" :to="{ name: 'boards' }">Home</router-link>
        </li>
      </ul>
      <div class="px-3 text-light" v-if="$auth.isAuthenticated">{{profile.name}}</div>
      <span class="navbar-text">
        <!-- <button class="btn btn-bg text-light p-1" @click="login" v-if="!$auth.isAuthenticated">Login</button> -->
        <button class="btn btn-danger p-1 btn-logout" @click="logout" v-if="$auth.isAuthenticated">Logout</button>
      </span>
    
    </div>
    
    </div>    
  </nav>
</template>

<script>
import axios from "axios";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    // async login() {
    //   await this.$auth.loginWithPopup();
    //   this.$store.dispatch("setBearer", this.$auth.bearer);
    //   this.$store.dispatch("getProfile");
    //   console.log("this.$auth.user: ");
    //   console.log(this.$auth.user);
    //   this.$router.push("boards")
    // },
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({returnTo: window.location.origin});
    }
  },
  computed: {
    profile() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
.kanji{
  font-family: 'Ma Shan Zheng', cursive; 
}
.bg-nav {
  background-color: rgba(50, 50, 50, 0.4);
}
.btn-logout {
  background-color: red;
  font-weight: 550!important;
}
</style>
