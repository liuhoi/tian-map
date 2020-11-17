const path = require('path')
const fs =require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const VueLooaderPlugin = require('vue-loader/lib/plugin')

const {CLIROOT} = require('../common/constant')

const resolve = (url) => path.resolve(CLIROOT, url)

const modules = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test:/\.js$/,
      //   exclude:/node_modules|bower_components/,
      //   use:[{
      //     loader:'babel-loader',
      //     options:{
      //       presets:[
      //         [
      //           '@babel/preset-env',
      //           {
      //             corejs:3,
      //           }
      //         ]
      //       ],
      //       plugins:[
      //         [
      //           '@babel/plugin-transform-runtime',
      //           {
      //             corejs:3
      //           }
      //         ]
      //       ]
      //     }
      //   }]
      // }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-tmap',
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