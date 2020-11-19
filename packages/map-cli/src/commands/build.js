const {setNodeEnv} = require('../common')
const {compileSite} = require('../compiler/compile-site')

module.exports = async function(){
  setNodeEnv('production');
  await compileSite(true);
}