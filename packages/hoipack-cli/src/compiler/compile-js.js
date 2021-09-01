const { transformAsync } = require ('@babel/core');
const { readFileSync, removeSync, outputFileSync } = require ('fs-extra');
const { replaceExt } = require ('../common');
const { replaceCssImportExt } = require ('../common/css');
const { replaceScriptImportExt } = require ('./get-deps');

const compileJs = (filePath) => {
  return new Promise((resolve, reject) => {
    let code = readFileSync(filePath, 'utf-8');

    code = replaceCssImportExt(code);
    code = replaceScriptImportExt(code, '.vue', '');
   
   
    transformAsync(code, { filename: filePath })
      .then((result) => {
        if (result) {
          const jsFilePath = replaceExt(filePath, '.js');
          removeSync(filePath);
          outputFileSync(jsFilePath, result.code);
          resolve();
        }
      })
      .catch(reject);
  });
}
exports.compileJs = compileJs