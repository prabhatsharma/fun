<template>
  <div>
    <div>
      <div id="embeddingContainer" class="embeddedReport"></div>
    </div>
  </div>
</template>

<script>
import { embedSession } from "amazon-quicksight-embedding-sdk";

export default {
  data: function () {
    return {
      reportUrl: "",
      reportList: [],
      REPORTS_URL: "",
      // this.$store.state.API_URL[process.env.VUE_APP_ENV] + "/quicksight/",
    };
  },
  created: function () {
    console.log("process.env = ", process.env);
    // setTimeout(this.loadReport(), 1000);
    this.loadReport();
  },
  methods: {
    loadReport: function () {
      // DashboardId = "9a845c13-46a4-4baa-bd5e-450016754d0d"
      // var EMBEDDED_URL = this.REPORTS_URL;
      var EMBEDDED_URL =
        this.$store.state.API_URL[process.env.VUE_APP_ENV] +
        "/reports/reporterurl";
      // var EMBEDDED_URL = "http://localhost:6080/reports/reporterurl";
      // document.getElementById("embeddingContainer").innerHTML = "Loading report/dashboard...";
      this.$http
        .get(EMBEDDED_URL)
        .then((resp) => {
          const fxString = this.fixBadJSON(resp.data.result);
          const fixedJSON = JSON.parse(fxString);
          var decodedEmbedUrl = fixedJSON.EmbedUrl;

          var options = {
            url: decodedEmbedUrl,
            container: document.getElementById("embeddingContainer"),
            parameters: {},
            scrolling: "no",
            height: "2024px",
            width: "100%",
            locale: "en-US",
            footerPaddingEnabled: true,
            defaultEmbeddingVisualType: "TABLE", // this option only applies to experience embedding and will not be used for dashboard embedding
          };

          document.getElementById("embeddingContainer").innerHTML = ""; // clear the div before placing new report in it
          embedSession(options); // Finally embed the report
        })
        .catch((e) => {
          document.getElementById("embeddingContainer").innerHTML =
            "<div> Error Occured! </div> " + e;
        });
    },
    fixBadJSON: function (badJSON) {
      // Change relaxedJson to strict json
      var fixedJSON = badJSON
        // Replace ":" with "@colon@" if it's between double-quotes
        .replace(/:\s*"([^"]*)"/g, function (match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"';
        })
        // Replace ":" with "@colon@" if it's between single-quotes
        .replace(/:\s*'([^']*)'/g, function (match, p1) {
          return ': "' + p1.replace(/:/g, "@colon@") + '"';
        })
        // Add double-quotes around any tokens before the remaining ":"
        .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')
        // Turn "@colon@" back into ":"
        .replace(/@colon@/g, ":");
      return fixedJSON;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
