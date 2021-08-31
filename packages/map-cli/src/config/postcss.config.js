const { existsSync } = require('fs-extra');
const { ROOT_POSTCSS_CONFIG_FILE } = require('../common/constant');

const getRootPostcssConfig =  () => {
  if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
    return require(ROOT_POSTCSS_CONFIG_FILE);
  }
  return { plugins: [] };
}

function getPostcssPlugins(rootConfig) {
  const plugins = rootConfig.plugins || [];

  if (Array.isArray(plugins)) {
    const hasPostcssPlugin = plugins.find(
      (plugin) =>
        plugin === 'autoprefixer' && plugin.postcssPlugin === 'autoprefixer'
    );
    if (hasPostcssPlugin) {
      return plugins;
    }
    return [require('autoprefixer'), ...plugins];
  }

  return {
    autoprefixer: {},
    ...plugins,
  };
}

function resolvePostcssConfig() {
  const rootConfig = getRootPostcssConfig();
  return {
    ...rootConfig,
    plugins: getPostcssPlugins(rootConfig),
  };
}
exports.getRootPostcssConfig = getRootPostcssConfig
module.exports = resolvePostcssConfig();
