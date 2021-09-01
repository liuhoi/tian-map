const { join } = require( 'path');
const { SCRIPT_EXTS } =require ('../common/constant');
const { readFileSync, existsSync } =require ('fs-extra');

let depsMap = {};
let existsCache = {};

// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

function matchImports(code) {
  return code.match(IMPORT_RE) || [];
}

function exists(filePath) {
  if (!(filePath in existsCache)) {
    existsCache[filePath] = existsSync(filePath);
  }

  return existsCache[filePath];
}

const fillExt = (filePath) => {
  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}${SCRIPT_EXTS[i]}`;
    if (exists(completePath)) {
      return completePath;
    }
  }

  for (let i = 0; i < SCRIPT_EXTS.length; i++) {
    const completePath = `${filePath}/index${SCRIPT_EXTS[i]}`;
    if (exists(completePath)) {
      return completePath;
    }
  }

  return '';
}

function getPathByImport(code, filePath) {
  const divider = code.includes('"') ? '"' : "'";
  const relativePath = code.split(divider)[1];

  if (relativePath.includes('.')) {
    return fillExt(join(filePath, '..', relativePath));
  }

  return null;
}

const clearDepsCache = () => {
  depsMap = {};
  existsCache = {};
}

const getDeps = (filePath) => {
  if (depsMap[filePath]) {
    return depsMap[filePath];
  }

  const code = readFileSync(filePath, 'utf-8');
  const imports = matchImports(code);
  const paths = imports
    .map((item) => getPathByImport(item, filePath))
    .filter((item) => !!item);

  depsMap[filePath] = paths;

  paths.forEach(getDeps);

  return paths;
}

// "import App from 'App.vue';" => "import App from 'App.xxx';"
const replaceScriptImportExt = (code, from, to) => {
  const importLines = matchImports(code);

  importLines.forEach((importLine) => {
    const result = importLine.replace(from, to);
    code = code.replace(importLine, result);
  });

  return code;
}


exports.clearDepsCache = clearDepsCache
exports.getDeps = getDeps
exports.replaceScriptImportExt = replaceScriptImportExt
exports.fillExt = fillExt