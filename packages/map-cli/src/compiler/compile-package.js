const webpack = require( 'webpack');
const { getPackageConfig } = require(  '../config/webpack.package');

const compilePackage = async function (isMinify) {
  return new Promise((resolve, reject) => {
    const config = getPackageConfig(isMinify);

    webpack(config, (err, stats) => {
      if (err || (stats.hasErrors())) {
        reject(err || stats.toString());
      } else {
        resolve();
      }
    });
  });
}
exports.compilePackage = compilePackage