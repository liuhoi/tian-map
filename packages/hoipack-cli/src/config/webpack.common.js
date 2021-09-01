const path = require('path')
const fs =require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

const {CLIROOT,ROOT} = require('../common/constant')

const resolve = (url) => path.resolve(CLIROOT, url)

const CSS_LOADERS = [
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
  'postcss-loader'
];

const modules = {
  entry:resolve('site/main.js'),
  output:{
    path:path.resolve(ROOT,'dist'),
    filename:'[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules|bower_components/,
        use:[{
          loader:'babel-loader',
          options:{
            presets:[
              [
                '@babel/preset-env'
              ],
              [
                '@vue/babel-preset-jsx'
              ]
            ],
            plugins:[
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs:3
                }
              ],
              [
                '@babel/plugin-syntax-dynamic-import'
              ],
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: 'sass-loader',
          },
        ],
      },
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue-tmap',
      template:resolve('site/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve:{
    extensions:['.js', '.vue', '.json'],
    alias:{
      '@':path.resolve(ROOT,'src'),
      '@docs':resolve('docs'),
    },
    symlinks: true
  }
}

module.exports = modules