/**
 * Build style entry of all components
 */

 const { sep, join, relative } = require( 'path' );
 const { outputFileSync } = require( 'fs-extra');
 const { getComponents, replaceExt } = require( '../common');
 const { CSS_LANG, getCssBaseFile } = require( '../common/css');
 const { checkStyleExists } = require( './gen-style-deps-map');
 const {
   ES_DIR,
   SRC_DIR,
   LIB_DIR,
   STYLE_DEPS_JSON_FILE,
 } = require( '../common/constant');
 
 function getDeps(component){
   const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
 
   if (styleDepsJson.map[component]) {
     const deps = styleDepsJson.map[component].slice(0);
 
     if (checkStyleExists(component)) {
       deps.push(component);
     }
 
     return deps;
   }
 
   return [];
 }
 
 function getPath(component, ext = '.css') {
   return join(ES_DIR, `${component}/index${ext}`);
 }
 
 function getRelativePath(component, style, ext) {
   return relative(join(ES_DIR, `${component}/style`), getPath(style, ext));
 }
 
 const OUTPUT_CONFIG = [
   {
     dir: ES_DIR,
     template: (dep) => `import '${dep}';`,
   },
   {
     dir: LIB_DIR,
     template: (dep) => `require('${dep}');`,
   },
 ];
 
 function genEntry(params) {
   const { ext, filename, component, baseFile } = params;
   const deps = getDeps(component);
   const depsPath = deps.map(dep => getRelativePath(component, dep, ext));
 
   OUTPUT_CONFIG.forEach(({ dir, template }) => {
     const outputDir = join(dir, component, 'style');
     const outputFile = join(outputDir, filename);
 
     let content = '';
 
     if (baseFile) {
       const compiledBaseFile = replaceExt(baseFile.replace(SRC_DIR, dir), ext);
       content += template(relative(outputDir, compiledBaseFile));
       content += '\n';
     }
 
     content += depsPath.map(template).join('\n');
     content = content.replace(new RegExp('\\' + sep, 'g'), '/');
     outputFileSync(outputFile, content);
   });
 }
 
function genComponentStyle(
   options = { cache: true }
 ) {
   if (!options.cache) {
     delete require.cache[STYLE_DEPS_JSON_FILE];
   }
 
   const components = getComponents();
   const baseFile = getCssBaseFile();
 
   components.forEach(component => {
     genEntry({
       baseFile,
       component,
       filename: 'index.js',
       ext: '.css',
     });
 
     if (CSS_LANG !== 'css') {
       genEntry({
         baseFile,
         component,
         filename: CSS_LANG + '.js',
         ext: '.' + CSS_LANG,
       });
     }
   });
 }
exports.genComponentStyle = genComponentStyle