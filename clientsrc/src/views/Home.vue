<template>
  <div class="home container-fluid bg-fuji">
    <div class="fullheight row align-content-center">
    <div class="col-12"><h1>Welcome to Kanban!</h1></div>
   <div class="col-12 mb-2"> <h4>Please log in to get started.</h4></div>
   <div class="col-12"><button class="btn btn-bg shadow p-1" @click="login" v-if="!$auth.isAuthenticated">Log In</button></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.user;
    }
  },
  mounted() {
    this.$store.dispatch("getProfile");
  },
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
      this.$router.push("boards")
    },
  },
  components: {}
};
</script>


<style>
.fullheight {
  min-height: 100vh;
}

.bg-fuji {
  background-image: url(../assets/fuji-wallpaper.jpg);
  background-size: cover;
  background-position: center;
}
</style>