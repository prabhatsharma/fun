<template>
  <div class="container">signing out.</div>
</template>

<script>
import { Auth } from "aws-amplify";
export default {
  created() {
    console.log("Signout");
    Auth.signOut({ global: true })
      .then((res) => {
        console.log(res);
        // this.$store.dispatch("setCredentials", {});
        // this.$store.dispatch("setSignedIn", false);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
    };
  },
};
</script>
