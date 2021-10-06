<template>
  <div class="container">sign in page. Id is: {{ id }}</div>
</template>

<script>
export default {
  setup() {},
  mounted() {
    // this.$router.push({ path: "/", name: "Home" });
    this.$router.replace({ path: "/", name: "Home" });
  },
  data: function () {
    return {
      id: "hello",
    };
  },
};
</script>
