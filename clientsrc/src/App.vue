<template>
  <div id="app">
    <navbar id="nav" />
    <!-- <div class="marginish"></div> -->
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar
  }
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
font-family: 'Didact Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(50, 50, 50, 0.4);
}

#nav a {
  font-weight: 600;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #2c3e50;
}
.marginish{
  height: 5vh;
}
</style>
