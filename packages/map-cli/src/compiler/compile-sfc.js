const hash = require('hash-sum')
const {parse} = require('path')
const {remove, writeFileSync, readFileSync} = require('fs-extra')

const  compileUtils = require('@vue/component-compiler-utils')

const compiler = require('vue-template-compiler')

const {replaceExt} = require('../common')

const {compileJs} = require('./compile-js')
const {compileStyle} = require('./compile-style')

const VUEIDS = '__vue_sfc__';
const EXPORT = 'export default';
const RENDER_FN = '__vue_render__';
const STATIC_RENDER_FN = '__vue_staticRenderFns__';


// trim some unused code
function trim(code) {
  return code.replace(/\/\/\n/g, '').trim();
}

function getSfcStylePath(filePath, ext, index) {
  const number = index !== 0 ? `-${index + 1}` : '';
  return replaceExt(filePath, `-sfc${number}.${ext}`);
}

function getExportKeyword(script) {
  const EXPORT_DEFAULT = 'export default {';
  const EXPORT_WITH_DEFINE_COMPONENT = 'export default defineComponent({';
  return script.includes(EXPORT_WITH_DEFINE_COMPONENT)
    ? EXPORT_WITH_DEFINE_COMPONENT
    : EXPORT_DEFAULT;
}

// inject render fn to script
function injectRender(script, render) {
  script = trim(script);

  render = render
    .replace('var render', `var ${RENDER_FN}`)
    .replace('var staticRenderFns', `var ${STATIC_RENDER_FN}`);

  const exportKeyword = getExportKeyword(script);

  return script.replace(
    exportKeyword,
    `${render}\n${exportKeyword}\n  render: ${RENDER_FN},\n\n  staticRenderFns: ${STATIC_RENDER_FN},\n`
  );
}

function injectScopeId(script, scopeId) {
  const exportKeyword = getExportKeyword(script);
  return script.replace(
    exportKeyword,
    `${exportKeyword}\n  _scopeId: '${scopeId}',\n\n`
  );
}

function injectStyle(
  script,
  styles,
  filePath
) {
  if (styles.length) {
    const exportKeyword = getExportKeyword(script);
    const imports = styles
      .map((style, index) => {
        const { base } = parse(getSfcStylePath(filePath, 'css', index));
        return `import './${base}';`;
      })
      .join('\n');

    return script.replace(exportKeyword, `${imports}\n\n${exportKeyword}`);
  }

  return script;
}

function compileTemplate(template) {
  const result = compileUtils.compileTemplate({
    compiler,
    source: template,
    isProduction: true,
  });

  return result.code;
}

function parseSfc(filePath) {
  const source = readFileSync(filePath, 'utf-8');

  const descriptor = compileUtils.parse({
    source,
    compiler,
    needMap: false,
  });

  return descriptor;
}

const compileSfc = async (filePath)=>{
  const tasks = [remove(filePath)];
  const source = readFileSync(filePath, 'utf-8');
  const descriptor = parseSfc(filePath);
  const { template, styles } = descriptor;

  const hasScoped = styles.some((s) => s.scoped);
  const scopeId = hasScoped ? `data-v-${hash(source)}` : '';

  // compile js part
  if (descriptor.script) {
    const lang = descriptor.script.lang || 'js';
    const scriptFilePath = replaceExt(filePath, `.${lang}`);

    tasks.push(
      new Promise((resolve, reject) => {
        let script = descriptor.script.content;
        script = injectStyle(script, styles, filePath);

        if (template) {
          const render = compileTemplate(template.content);
          script = injectRender(script, render);
        }

        if (scopeId) {
          script = injectScopeId(script, scopeId);
        }

        writeFileSync(scriptFilePath, script);
        compileJs(scriptFilePath).then(resolve).catch(reject);
      })
    );
  }

  // compile style part
  tasks.push(
    ...styles.map((style, index) => {
      const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index);

      let styleSource = trim(style.content);

      if (style.scoped) {
        styleSource = compileUtils.compileStyle({
          id: scopeId,
          scoped: true,
          source: styleSource,
          filename: cssFilePath,
          preprocessLang: style.lang,
        }).code;
      }

      writeFileSync(cssFilePath, styleSource);

      return compileStyle(cssFilePath);
    })
  );

  return Promise.all(tasks);
}

exports.compileSfc = compileSfc
