const { renderSync } = require('sass');

 const compileSass = async function (filePath) {
  const { css } = renderSync({ file: filePath });
  return css;
}

exports.compileSass = compileSass