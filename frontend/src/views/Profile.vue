<template>
  <div>
    <h1>Profile</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$root.authentication(true);
  },
};
</script>
