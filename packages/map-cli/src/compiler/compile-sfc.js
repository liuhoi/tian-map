const hash = require('hash-sum')
const {parse: pathParse} = require('path')
const {remove, writeFileSync, readFileSync} = require('fs-extra')

const {parse, compileTemplate} = require('@vue/component-compiler-utils')

const VueTemplateCompiler = require('vue-template-compiler')

const {replaceExt} = require('../common')

const RENDER_FN = '__vue_render__';
const VUEIDS = '__vue_sfc__';
const EXPORT = 'export default';

const parseSfc = (filename)=>{
  const source = readFileSync(filename, 'utf-8');
  const descriptor = parse({source, filename , compiler:VueTemplateCompiler} );

  return descriptor;
}

const compileSfc = async (filePath)=>{
  const tasks =  [remove(filePath)];
  const source = readFileSync(filePath, 'utf-8');
  const {template,styles,script:sfcScript,customBlocks} = parseSfc(filePath);
  const hasScoped = styles.some((s) => s.scoped);
  const scopeId = hasScoped ? `data-v-${hash(source)}` : '';
  const lang = descriptor.script.lang || 'js';
  const scriptFilePath = replaceExt(filePath, `.${lang}`);
  tasks.push(
    new Promise((resolve,reject) => {
      let script = sfcScript.content;
      script = injectStyle(script,styles,filePath)
      script = script.replace(EXPORT, `const ${VUEIDS} =`);
    })
  )
}

exports.compileSfc = compileSfc
