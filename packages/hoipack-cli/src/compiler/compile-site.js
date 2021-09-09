const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const {getPortPromise} = require('portfinder')
const {get} = require('lodash')


const {getSiteDevConfig} = require('../config/webpack.site.dev')
const getProdConfig = require('../config/webpack.prod')

const runDevServer = async (port,config) => {
  const host = get(config.devServer,'host','localhost')
  const server = new WebpackDevServer(
    {
      ...config.devServer,
      port,
      host
    },
    webpack(config)
  )

  
  await server.start();
}

const watch = async function(){
  const config = getSiteDevConfig();
  let port = await getPortPromise({
    port:config.devServer.port || 3000
  })
  await runDevServer(port,config)
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
  console.log(process.env.COMPILER_TYPE)
  if(production){
    await build();
  }else{
    await watch();
  }
}