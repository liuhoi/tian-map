const {setNodeEnv,setCompilerType,getCompilerType} = require('../common')
const {compileSite} = require('../compiler/compile-site')

module.exports = async function(type,options){
  setCompilerType(getCompilerType(type,options.version))
  setNodeEnv('development');
  await compileSite();
}