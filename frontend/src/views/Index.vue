<template>
  <div>
    <h1>Index</h1>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data: 'ss',
    };
  },
  methods: {

  },
  created () {
      this.$root.authentication(false)
  }
};
</script>
