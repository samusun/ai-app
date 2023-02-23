console.log("Webpack config loaded");

const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      http: require.resolve("stream-http"),
    },
  },
};
