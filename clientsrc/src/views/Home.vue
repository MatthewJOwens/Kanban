<template>
  <div class="home">
    <h1>This is your home page.</h1>
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
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>