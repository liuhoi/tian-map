const path = require('path')
const fs =require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const VueLooaderPlugin = require('vue-loader/lib/plugin')

const appRoot = fs.realpathSync(process.cwd())

const resolve = (url) => path.resolve(appRoot, url)

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
      template:resolve('docs/index.html')
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