const { merge } = require('webpack-merge');
const common =require('./webpack.common')

const modules = merge(common,{
    mode:'production'
})

module.exports = modules