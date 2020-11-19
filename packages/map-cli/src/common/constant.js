const {join,dirname,isAbsolution,parse} = require('path');
const {pathExistsSync} = require('fs-extra')

function findRootDir(dir) {

  if (dir === rootDir || dir === '/') {
    return CWD;
  }

  if (pathExistsSync(join(dir, 'pllh.config.js'))) {
    return dir;
  }

  return findRootDir(dirname(dir));
}

const CWD = process.cwd();
const rootDir = parse(CWD).root;

const ROOT = findRootDir(CWD);

const CLIROOT = join(__dirname,'../..');

exports.GREEN = '#07c160';

exports.ROOT = ROOT;

exports.CWD = CWD;

exports.CLIROOT = CLIROOT;

exports.SITE_DIST_DIR = join(ROOT, 'site');

