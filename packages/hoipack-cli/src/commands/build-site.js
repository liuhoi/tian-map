const {emptyDir} = require('fs-extra')
const {setNodeEnv} = require('../common')
const {SITE_DIST_DIR} = require('../common/constant')
const {compileSite} = require('../compiler/compile-site')

module.exports = async function(){
  setNodeEnv('production');
  await emptyDir(SITE_DIST_DIR)
  await compileSite(true);
}