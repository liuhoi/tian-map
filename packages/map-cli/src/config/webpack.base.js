const sass = require( 'sass');
const webpack  = require( 'webpack');
const { VueLoaderPlugin }  = require( 'vue-loader');
const path  = require( 'path');
const { consola }  = require( '../common/logger');
const { existsSync }  = require( 'fs');

const {
  CWD,
  STYLE_EXTS,
  SCRIPT_EXTS,
  POSTCSS_CONFIG_FILE,
  CLIROOT,
  ROOT
}  = require( '../common/constant');

const resolve = (url) => path.resolve(CLIROOT, url)

const CSS_LOADERS = [
  require.resolve('style-loader'),
  require.resolve('css-loader'),
  {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: require(POSTCSS_CONFIG_FILE),
    },
  },
];

const VUE_LOADER = {
  loader: require.resolve('vue-loader'),
  options: {
    compilerOptions: {
      preserveWhitespace: false,
    },
  },
};

const plugins = [
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  }),
  new VueLoaderPlugin(),
];

const tsconfigPath = path.join(CWD, 'tsconfig.json');
if (existsSync(tsconfigPath)) {
  const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
  plugins.push(
    new ForkTsCheckerPlugin({
      formatter: 'codeframe',
      vue: { enabled: true },
      logger: {
        issues: {
          // skip info message
          log() {},
          warn(message) {
            consola.warn(message);
          },
          error(message) {
            consola.error(message);
          },
        },
      },
    })
  );
}

const baseConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
    alias:{
      '@':path.resolve(ROOT,'src'),
      '@docs':resolve('docs'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [VUE_LOADER],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [require.resolve('babel-loader')],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, require.resolve('less-loader')],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: require.resolve('sass-loader'),
            options: {
              implementation: sass,
            },
          },
        ],
      },
      // {
      //   test: /\.md$/,
      //   use: [VUE_LOADER, require.resolve('@vant/markdown-loader')],
      // },
    ],
  },
  plugins,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
};
exports.baseConfig=baseConfig