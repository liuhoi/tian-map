const { renderSync } = require('sass');


// allow to import from node_modules
// @import "~package-name/var.scss"
const tildeImporter = (url) => {
  if (url.includes('~')) {
    url = url.replace('~', '');

    if (!url.includes('.scss')) {
      url += '.scss';
    }

    url = require.resolve(url);
  }
  return { file: url };
};

 const compileSass = async function (filePath) {
  const { css } = renderSync({ file: filePath, importer: tildeImporter });
  return css;
}

exports.compileSass = compileSass