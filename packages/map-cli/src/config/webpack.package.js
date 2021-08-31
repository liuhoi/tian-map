const { merge } = require( 'webpack-merge');
const { join }  = require( 'path');
const { baseConfig }  = require( './webpack.base');
const { getHoiConfig, getWebpackConfig, setBuildTarget }  = require( '../common');
const { LIB_DIR, ES_DIR }  = require( '../common/constant');

const getPackageConfig = function (isMinify) {
  const { name } = getHoiConfig();

  setBuildTarget('package');

  return getWebpackConfig(
    merge(baseConfig, {
      mode: 'production',
      entry: {
        [name]: join(ES_DIR, 'index.js'),
      },
      stats: 'none',
      output: {
        path: LIB_DIR,
        library: name,
        libraryTarget: 'umd',
        filename: isMinify ? '[name].min.js' : '[name].js',
        umdNamedDefine: true,
        // https://github.com/webpack/webpack/issues/6522
        globalObject: "typeof self !== 'undefined' ? self : this",
      },
      externals: {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
      },
      performance: false,
      optimization: {
        minimize: isMinify,
      },
    })
  );
}

exports.getPackageConfig = getPackageConfig