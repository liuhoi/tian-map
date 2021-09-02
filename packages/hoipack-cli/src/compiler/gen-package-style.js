const { join } = require( 'path');
const { existsSync } = require( 'fs-extra');
const { smartOutputFile, normalizePath } = require( '../common');
const { CSS_LANG, getCssBaseFile } = require( '../common/css');
const { SRC_DIR, STYLE_DEPS_JSON_FILE } = require( '../common/constant');

 function genPackageStyle(options) {
  const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
  const ext = '.' + CSS_LANG;

  let content = '';

  let baseFile = getCssBaseFile();
  if (baseFile) {
    if (options.pathResolver) {
      baseFile = options.pathResolver(baseFile);
    }

    content += `@import "${normalizePath(baseFile)}";\n`;
  }

  content += styleDepsJson.sequence
    .map((name) => {
      let path = join(SRC_DIR, `${name}/index${ext}`);

      if (!existsSync(path)) {
        return '';
      }

      if (options.pathResolver) {
        path = options.pathResolver(path);
      }

      return `@import "${normalizePath(path)}";`;
    })
    .filter((item) => !!item)
    .join('\n');

  smartOutputFile(options.outputPath, content);
}

exports.genPackageStyle = genPackageStyle
