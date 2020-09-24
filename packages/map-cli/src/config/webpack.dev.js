const { merge } = require('webpack-merge');
const common =require('./webpack.common')

const modules = merge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        port:9990,
        open:true
    }
})

module.exports = modules