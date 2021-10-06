import { createStore } from "vuex";

export default createStore({
  state: {
    signedIn: false,
    API_URL: {
      local: "http://localhost:6080",
      development: "https://api.dev.raereports.com",
      test: "https://api.test.raereports.com",
      production: "https://api.raereports.com",
    },
  },
  mutations: {
    setSignedIn(state, payload) {
      state.signedIn = payload;
    },
  },
  actions: {
    setSignedIn(context, payload) {
      context.commit("setSignedIn", payload);
    },
  },
  modules: {},
});
