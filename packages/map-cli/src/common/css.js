const {get} = require('lodash')

const {getHoiConfig} = require('../common')

const { join, isAbsolute } = require( 'path');

const { STYLE_DIR, SRC_DIR } = require('./constant') ;

function getCssLang() {
  const hoiConfig = getHoiConfig();
  const preprocessor = get(hoiConfig, 'build.css.preprocessor', 'sass');

  if (preprocessor === 'sass') {
    return 'scss';
  }

  return preprocessor;
}

const CSS_LANG = getCssLang();

const getCssBaseFile = ()=>{
  const hoiConfig = getHoiConfig();
  let path = join(STYLE_DIR, `base.${CSS_LANG}`);

  const baseFile = get(hoiConfig, 'build.css.base', '');
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile);
  }

  if (existsSync(path)) {
    return path;
  }

  return null;
}

exports.CSS_LANG = CSS_LANG

exports.getCssBaseFile = getCssBaseFile