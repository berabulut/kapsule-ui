const { nextI18NextRewrites } = require("next-i18next/rewrites");

const localeSubpaths = {};

const PROD = process.env.PROD;

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env: {
    apiURL: PROD === "true" ? "/api" : "http://localhost:8080", //,
    serverApiUrl: PROD === "true" ? "http://service:8080" : "http://localhost:8080",
    redirectingURL: PROD === "true" ? "s" : "http://localhost:8081", //
  },
};
