const { merge } = require( 'webpack-merge');
const { join }  = require( 'path');
const { baseConfig }  = require( './webpack.base');
const { getHoiConfig, getWebpackConfig, setBuildTarget }  = require( '../common');
const { LIB_DIR, ES_DIR }  = require( '../common/constant');

const getPackageConfig = function (isMinify) {
  const { name } = getHoiConfig();

  setBuildTarget('package');
  let {COMPILER_TYPE} = process.env;

  let externals = /vue/.test(COMPILER_TYPE) ? {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    }
  } : {
    react: {
      root: 'React',
      commonjs: 'React',
      commonjs2: 'React',
      amd: 'React',
    }
  };

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
        ...externals
      },
      performance: false,
      optimization: {
        minimize: isMinify,
      },
    })
  );
}

exports.getPackageConfig = getPackageConfig