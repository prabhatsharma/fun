<template>
  <div class="home">
    <h1>This is Home page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { Analytics } from "aws-amplify";

export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  mounted() {
    Analytics.record({ name: "homepageVisited" });
  },
};
</script>
