const webpack  = require( 'webpack');
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
  'style-loader',
  { loader: 'css-loader', options: { importLoaders: 1 } },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: require(POSTCSS_CONFIG_FILE),
    },
  },
];

const BABEL_LOADER = {
  loader:'babel-loader',
  options:{
    presets:[
      // [
      //   '@babel/preset-env'
      // ],
      // [
      //   '@vue/babel-preset-jsx'
      // ],
    ],
    // plugins:[
    //   [
    //     '@babel/plugin-transform-runtime',
    //     {
    //       corejs:3
    //     }
    //   ],
    //   [
    //     '@babel/plugin-syntax-dynamic-import'
    //   ],
    // ]
  }
};


const plugins = [
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  }),
  
];

// const tsconfigPath = path.join(CWD, 'tsconfig.json');
// if (existsSync(tsconfigPath)) {
//   const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
//   plugins.push(
//     new ForkTsCheckerPlugin({
//       formatter: 'codeframe',
//       vue: { enabled: true },
//       logger: {
//         issues: {
//           // skip info message
//           log() {},
//           warn(message) {
//             consola.warn(message);
//           },
//           error(message) {
//             consola.error(message);
//           },
//         },
//       },
//     })
//   );
// }

const baseConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
    alias:{
      '@':path.resolve(ROOT,'src')
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   use: [VUE_LOADER],
      // },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude:/node_modules|bower_components/,
        use:[BABEL_LOADER]
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        sideEffects: true,
        use: [...CSS_LOADERS,'sass-loader'],
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