import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";

Amplify.configure(aws_exports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});

const myapp = createApp(App);

myapp.use(Quasar, quasarUserOptions).use(store).use(router).mount("#app");

import http from "./http";
myapp.config.globalProperties.$http = http; // vue 3
// Vue.prototype.$http = http; - vue 2
