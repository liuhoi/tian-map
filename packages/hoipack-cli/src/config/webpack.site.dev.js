const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const {baseConfig} = require('./webpack.base')
const path  = require( 'path');

const {CLIROOT,ROOT} = require('../common/constant')

const resolve = (url) => path.resolve(CLIROOT, url)

const getSiteDevBaseConfig = ()=>{
  const { COMPILER_TYPE} = process.env;
  let config = /vue/.test(COMPILER_TYPE) ? getVueConfig() : getReactConfig();
  return merge(baseConfig,config,{
    entry:resolve(`site/${COMPILER_TYPE}/main.js`),
    output:{
      path:path.resolve(ROOT,'dist'),
      filename:'[name][hash].js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      port: 9990,
      open: true
    },
    plugins:[
      new HtmlWebpackPlugin({
        title: 'vue-tmap',
        template:resolve('site/index.html')
      }),
      new CleanWebpackPlugin()
    ]
  })
}

const getVueConfig = ()=>{
  const { VueLoaderPlugin }  = require( 'vue-loader');
  const VUE_LOADER = {
    loader: 'vue-loader',
    options: {
      compilerOptions: {
        preserveWhitespace: false,
      },
    },
  };
  return {
    module:{
      rules: [
        {
          test: /\.vue$/,
          use: [VUE_LOADER],
        },
      ]
    },
    plugins:[new VueLoaderPlugin()]
  }
}

const getReactConfig = ()=>{
  return {}
}

const getSiteDevConfig = () => {
  return getSiteDevBaseConfig()
}

exports.getSiteDevConfig = getSiteDevConfig
