const {join,dirname,isAbsolution,parse} = require('path');
const {pathExistsSync} = require('fs-extra')

exports.CWD = process.cwd();

const rootDir = parse(exports.CWD).root;

function findRootDir(dir) {

  if (dir === rootDir || dir === '/') {
    return exports.CWD;
  }

  if (pathExistsSync(join(dir, 'pllh.config.js'))) {
    return dir;
  }

  return findRootDir(dirname(dir));
}

exports.GREEN = '#07c160';

exports.ROOT = findRootDir(exports.CWD);

exports.CLIROOT = join(__dirname,'../..');

exports.SITE_DIST_DIR = join(exports.ROOT, 'site');
