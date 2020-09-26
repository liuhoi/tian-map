const path = require('path')
const fs =require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const VueLooaderPlugin = require('vue-loader/lib/plugin')

const {CLIROOT,ROOT} = require('../common/constant')

const resolve = (url) => path.resolve(CLIROOT, url)

const modules = {
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 32423,
      template:resolve('site/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLooaderPlugin()
  ],
  resolve:{
    alias:{
      '@':resolve('src'),
      '@docs':resolve('docs'),
    }
  }
}

module.exports = modules