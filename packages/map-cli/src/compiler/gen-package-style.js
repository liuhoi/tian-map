const {
  lstatSync,
  existsSync,
  readdirSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra')

const {join} =require('path')

const {SRC_DIR,STYLE_DEPS_JSON_FILE} = require('../common/constant')

const {getComponents,pascalize,smartOutputFile,normalizePath} = require('../common')

const { CSS_LANG, getCssBaseFile } = require('../common/css');
