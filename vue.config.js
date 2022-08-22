const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  transpileDependencies: true,
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname)
      },
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            'babel-loader',
            'vue-svg-loader',
          ],
        },
      ],
    },
  },
  parallel: false
})
