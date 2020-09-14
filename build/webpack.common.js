const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const modules = {
    module:{
        rules:[{
            
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:32423
        }),
        new CleanWebpackPlugin()
    ]
}

module.exports = modules