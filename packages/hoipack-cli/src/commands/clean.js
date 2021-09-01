const {remove} = require('fs-extra')
const {
  ES_DIR,
  LIB_DIR,
  DIST_DIR,
  SITE_DIST_DIR,
} = require('../common/constant')

const clean = async ()=>{
  await Promise.all([
    remove(ES_DIR),
    remove(LIB_DIR),
    remove(DIST_DIR),
    remove(SITE_DIST_DIR),
  ]);
}

exports.clean = clean