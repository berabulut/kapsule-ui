const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

const PROD = false

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env:{
    prod: PROD,
    apiURL: PROD ? "/api" : "http://localhost:8080", //,  
    redirectingURL: PROD ? "s" : "http://localhost:8081" //
  }
}