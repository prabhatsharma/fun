import axios from "axios";
import { Auth } from "aws-amplify";

// a wrapper around axios to pass credentials.
// standard interceptors was not working as the interceptor was asynchronous
var http = {
  get: async function (url) {
    var creds = await Auth.currentAuthenticatedUser();
    const idToken = creds.signInUserSession.idToken.jwtToken;

    const instance = axios.create({
      // timeout: 10000,
      headers: { Authorization: "Bearer " + idToken },
    });

    return instance.get(url);
  },
  post: async function (url, formData) {
    var creds = await Auth.currentAuthenticatedUser();
    const idToken = creds.signInUserSession.idToken.jwtToken;

    const instance = axios.create({
      // timeout: 10000,
      headers: { Authorization: "Bearer " + idToken },
    });

    return instance.post(url, formData);
  },
  put: async function (url, formData) {
    var creds = await Auth.currentAuthenticatedUser();
    const idToken = creds.signInUserSession.idToken.jwtToken;

    const instance = axios.create({
      // timeout: 10000,
      headers: { Authorization: "Bearer " + idToken },
    });

    return instance.put(url, formData);
  },
  delete: async function (url) {
    var creds = await Auth.currentAuthenticatedUser();
    const idToken = creds.signInUserSession.idToken.jwtToken;

    const instance = axios.create({
      // timeout: 10000,
      headers: { Authorization: "Bearer " + idToken },
    });

    return instance.delete(url);
  },
  putPresignedFile: async function (url, file, config) {
    const instance = axios.create({});

    return instance.put(url, file, config);
  },
};

export default http;
