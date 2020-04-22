<template>
  <div class="comment">
    {{commentData.body}}
    -{{commentData.creatorName}}
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>