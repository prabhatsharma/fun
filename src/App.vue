<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-teal-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Rae Reports</q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn-dropdown flat>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <q-avatar size="40px">
                <img :src="userPhotoUrl" />
              </q-avatar>
            </div>
          </template>

          <q-item-label header>Account</q-item-label>

          <q-item clickable v-close-popup to="/signout">
            <q-item-section avatar>
              <q-avatar icon="exit_to_app" color="red" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sign Out </q-item-label>
              <q-item-label style="font-size: 0.7rem">{{
                userFullName
              }}</q-item-label>
              <q-item-label style="font-size: 0.7rem"
                >({{ userEmail }})</q-item-label
              >
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
      <q-list>
        <q-item-label header> </q-item-label>

        <q-item to="/" clickable>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Home </q-item-label>
            <!-- <q-item-label caption>home</q-item-label> -->
          </q-item-section>
        </q-item>

        <q-item to="/reports" clickable @click="reportClicked">
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Reports </q-item-label>
            <q-item-label caption>Reports & Dashboards</q-item-label>
          </q-item-section>
        </q-item>

        <q-item to="/about" clickable>
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>
          <q-item-section>
            <q-item-label> About </q-item-label>
            <q-item-label caption>about</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <HelloWorld /> -->
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { Auth } from "aws-amplify";
import { Analytics } from "aws-amplify";
import awsconfig from "./aws-exports";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "LayoutDefault",

  components: {
    // HelloWorld,
  },

  setup() {
    console.log("inside setup");

    return {
      leftDrawerOpen: ref(false),
    };
  },
  data: function () {
    return {
      userPhotoUrl: "",
      userEmail: "",
      userFullName: "",
    };
  },
  methods: {
    reportClicked() {
      console.log("Home clicked");
      // this.leftDrawerOpen = false;
      // setTimeout(() => {
      //   this.leftDrawerOpen = true;
      // }, 200);

      // setTimeout(() => {
      //   this.leftDrawerOpen = false;
      // }, 600);
      // this.leftDrawerOpen = false;
    },
  },
  created() {
    Auth.currentAuthenticatedUser()
      .then((creds) => {
        console.log("Credentials exist");
        const userEmail = creds.signInUserSession.idToken.payload.email;
        this.userEmail = userEmail;
        this.userPhotoUrl = creds.signInUserSession.idToken.payload.picture;
        this.userFullName = creds.signInUserSession.idToken.payload.name;
        console.log("email: ", creds.signInUserSession.idToken.payload.email);
        console.log(creds);
        // this.$store.dispatch("setCredentials", creds);
        // this.$store.dispatch("setSignedIn", true);
        // this.getProfile()
        Analytics.updateEndpoint({
          address: userEmail,
          channelType: "EMAIL",
        })
          .then(() => {
            console.log("Analytics endpoint updated");
          })
          .catch((error) => {
            console.log("Analytics endpoint update failed: ", error);
          });
      })
      .catch((e) => {
        console.log("Credentials DO NOT exist");
        console.log(e);
        this.$store.dispatch("setSignedIn", false);

        const url =
          "https://" +
          awsconfig.oauth.domain +
          "/login?response_type=code&client_id=" +
          awsconfig.aws_user_pools_web_client_id +
          "&redirect_uri=" +
          awsconfig.oauth.redirectSignIn;

        // this.$router.push(url);
        window.location = url;
      });

    console.log("mounted - awsconfig is: ", awsconfig);
    const url =
      "https://" +
      awsconfig.oauth.domain +
      "/login?response_type=code&client_id=" +
      awsconfig.aws_user_pools_web_client_id +
      "&redirect_uri=" +
      awsconfig.oauth.redirectSignIn;
    console.log("url is: ", url);
    // if (!this.$store.state.signedIn) {
    //   this.$router.push(url);
    // }
    // https://rd-auth-local.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=3leigihggogte88869eo1ktc8s&redirect_uri=http://localhost:8080/signin/
  },
};
</script>
