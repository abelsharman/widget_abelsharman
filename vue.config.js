const webpack = require("webpack");
const prefixer = require("postcss-prefixer");

module.exports = {
  runtimeCompiler: true,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          prefixer({
            prefix: "b-",
          }),
        ],
      },
    },
  },
  devServer: {
    proxy: "https://equipmetry.abelsharman.kz/",
  },

  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
};