const {get} = require('lodash')

const {getHoiConfig} = require('../common')

function getCssLang() {
  const hoiConfig = getHoiConfig();
  const preprocessor = get(hoiConfig, 'build.css.preprocessor', 'sass');

  if (preprocessor === 'sass') {
    return 'scss';
  }

  return preprocessor;
}

const CSS_LANG = getCssLang();

exports.CSS_LANG = CSS_LANG