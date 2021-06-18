const webpack = require('webpack')
module.exports = {
  runtimeCompiler: true,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
    ]
  },
  devServer: {
    proxy: 'https://equipmetry.abelsharman.kz/',
  },

  chainWebpack:
    config => {
      config.optimization.delete('splitChunks')
    }
}


