module.exports = function (api, options = {}) {
  if (api) {
    api.cache.never();
  }

  const { BABEL_MODULE, NODE_ENV,COMPILER_TYPE} = process.env;
  const isTest = NODE_ENV === 'test';
  const useESModules = BABEL_MODULE !== 'commonjs' && !isTest;

  let commonPresets = [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: useESModules ? false : 'commonjs',
        loose: options.loose,
      },
    ],
    [
      '@babel/preset-typescript',
    ],
     // require('../compiler/babel-preset-vue-ts'),
  ]

  let compilerPresets = {
    react: [
      [
        '@babel/preset-react',
      ],
    ],
    vue2 : [
      [
        '@vue/babel-preset-jsx',
        {
          functional: false,
        },
      ],
    ],
    vue3 : [
      
    ]
  }

  let commonPlugins = [
    [
      'babel-plugin-import',
      {
        libraryName: 'tmap',
        libraryDirectory: useESModules ? 'es' : 'lib',
        style: true,
      },
      'tmap',
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs:3
      }
    ],
    ['@babel/plugin-syntax-dynamic-import']
  ]

  let compilerPlugins = {
    react:[],
    vue2:[],
    vue3: [
      [
        '@vue/babel-plugin-jsx',
        {
          enableObjectSlots: options.enableObjectSlots,
        },
      ],
    ]
  }


  let presets = [...commonPresets,...compilerPresets[COMPILER_TYPE]]
  let plugins = [...commonPlugins,...compilerPlugins[COMPILER_TYPE]]

  return {
    presets,
    plugins,
  };
};
