const { nextI18NextRewrites } = require('next-i18next/rewrites')

const localeSubpaths = {}

module.exports = {
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
  env:{
    apiURL: "http://localhost:8080", //"http://localhost/api",  
    redirectingURL:  "http://localhost:8081" //"http://localhost/short" 
  }
}