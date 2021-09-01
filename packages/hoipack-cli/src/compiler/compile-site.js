const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const {getPort} = require('portfinder')
const {ip} = require('address')
const {get} = require('lodash')

const {GREEN} = require('../common/constant')

const getDevConfig = require('../config/webpack.dev')
const getProdConfig = require('../config/webpack.prod')

const log = (content)=>console.log(chalk.hex(GREEN)(content))


const logServerInfo = function(port){
  const local = `http://localhost:${port}/`
  const network = `http://${ip()}:${port}/`

  log(`${chalk.bold('Local')}:   ${local}`)
  log(`${chalk.bold('Network')}:    ${network}`)
}

const runDevServer = function(port,config){
    const server = new WebpackDevServer(webpack(config),{
      ...config.devServer,
      port
    })

    const host = get(config.devServer,'host','localhost')
    server.listen(port,host,(err) => {
      if(err) log(err)
    })
}

const watch = async function(){
  const config = getDevConfig()
  getPort({
    port:config.devServer.port || 3000
  },(err,port)=>{
    logServerInfo(port)
    runDevServer(port,config)
   
  })
}

const build = async function(){
  return new Promise((resolve,reject) => {
    const config = getProdConfig;

    webpack(config,(err,stats) => {
      if (err || stats.hasErrors()) {
        reject();
      } else {
        resolve();
      }
    })
  })
}

exports.compileSite = async function(production = false){
  if(production){
    await build();
  }else{
    watch();
  }
}