const {join, dirname, isAbsolute} = require('path');
const {pathExistsSync} = require('fs-extra')

function findRootDir(dir) {

  if (pathExistsSync(join(dir, 'hoi.config.js'))) {
    return dir;
  }

  const parentDir = dirname(dir);
  if (dir === parentDir) {
    return dir;
  }

  return findRootDir(parentDir);
}


exports.CWD = process.cwd();

exports.GREEN = '#07c160';

exports.ROOT = findRootDir(exports.CWD);

exports.CLIROOT = join(__dirname,'../..');

exports.ES_DIR = join(exports.ROOT, 'es');
exports.LIB_DIR = join(exports.ROOT, 'lib');
exports.DOCS_DIR = join(exports.ROOT, 'docs');
exports.DIST_DIR = join(exports.ROOT, 'dist');
exports.SITE_DIST_DIR = join(exports.ROOT, 'site')
exports.VANT_CONFIG_FILE = join(exports.ROOT, 'hoi.config.js')


function getSrcDir() {

  return join(exports.ROOT, 'src');
}

function getHoiConfig() {
  try {
    return require(exports.VANT_CONFIG_FILE);
  } catch (err) {
    return {};
  }
}

exports.SRC_DIR = getSrcDir()

exports.getHoiConfig = getHoiConfig