const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env:{
    apiURL: "http://localhost/api", // "http://localhost:8080"
    redirectingURL: "http://localhost/short" // "http://localhost:8081"
  }
}