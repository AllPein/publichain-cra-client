const path = require("path")
const CracoAlias = require("craco-alias");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.entry = './src/index.tsx';
      return webpackConfig;
    },
    alias: {
      '@': path.join(path.resolve(__dirname, './src'))
    }
  },
  plugins: [
    {
       plugin: CracoAlias,
       options: {
          source: "tsconfig",
          // baseUrl SHOULD be specified
          // plugin does not take it from tsconfig
          baseUrl: ".",
          /* tsConfigPath should point to the file where "baseUrl" and "paths" 
          are specified*/
          tsConfigPath: "./tsconfig.paths.json"
       }
    }
 ]
}