<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { Analytics } from "aws-amplify";

export default {
  name: "About",
  components: {
    // HelloWorld,
  },
  mounted() {
    Analytics.record({ name: "aboutpageVisited" });
  },
};
</script>
