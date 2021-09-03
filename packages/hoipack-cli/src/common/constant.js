const {join, dirname, isAbsolute} = require('path');
const {pathExistsSync} = require('fs-extra')

const CONFIG_DIR = join(__dirname, '../config');

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
exports.ROOT_POSTCSS_CONFIG_FILE = join(exports.ROOT, 'postcss.config.js')
exports.POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js');

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

exports.STYLE_DIR =  join(exports.SRC_DIR, 'style')

exports.getHoiConfig = getHoiConfig

exports.SCRIPT_EXTS = ['.js', '.jsx', '.vue', '.ts', '.tsx'];
exports.STYLE_EXTS = ['.css', '.less', '.scss'];


const STYPE_DEPS_JSON_FILE = join(exports.DIST_DIR, 'style-deps.json');
exports.STYPE_DEPS_JSON_FILE = STYPE_DEPS_JSON_FILE

const PACKAGE_JSON_FILE = join(exports.ROOT, 'package.json');

const getPackageJson = function () {
  delete require.cache[PACKAGE_JSON_FILE];

  return require(PACKAGE_JSON_FILE);
}

exports.PACKAGE_JSON_FILE = PACKAGE_JSON_FILE
exports.getPackageJson = getPackageJson

exports.ROOT_WEBPACK_CONFIG_FILE = join(exports.ROOT, 'webpack.config.js');

