const {
  lstatSync,
  existsSync,
  readdirSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra');
const {join,sep} = require('path')

const {SRC_DIR,getHoiConfig,ROOT_WEBPACK_CONFIG_FILE} = require('./constant')

const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;
const EXT_REGEXP = /\.\w+$/;
const VUE_SFC_REGEXP = /\.(vue)$/;
const DEMO_REGEXP = new RegExp('\\' + sep + 'demo$');
const TEST_REGEXP = new RegExp('\\' + sep + 'test$');
const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
const STYLE_REGEXP = /\.(css|less|scss)$/;
const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;

const hasDefaultExport =(code) => {
  return code.includes('export default') || code.includes('export { default }');
}

const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}


const pascalize = (str) => {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  );
}

const  normalizePath = (path) => {
  return path.replace(/\\/g, '/');
}

const setModuleEnv = (value)=>{
  process.env.BABEL_MODULE = value
}

const setNodeEnv = (value)=>{
  process.env.NODE_ENV = value;
}

const setCompilerType = (value)=>{
  process.env.COMPILER_TYPE = value;
}

const setBuildTarget = (value)=>{
  process.env.BUILD_TARGET = value;
}

const isDir = (dir)=>{
  return lstatSync(dir).isDirectory()
}

const isDemoDir = (dir)=>{
  return DEMO_REGEXP.test(dir);
}

const isTestDir = (dir)=>{
  return TEST_REGEXP.test(dir);
}

const isAsset = (path) =>  {
  return ASSET_REGEXP.test(path);
}

const isVueSfc = (path) =>   {
  return VUE_SFC_REGEXP.test(path);
}

const isReactSfc = (path) =>   {
  return SCRIPT_REGEXP.test(path);
}

const isStyle = (path)  =>  {
  return STYLE_REGEXP.test(path);
}

const isScript = (path)  =>  {
  return SCRIPT_REGEXP.test(path);
}

const replaceExt = (path,ext)=>{
  return path.replace(EXT_REGEXP, ext);
} 


const getWebpackConfig = function (defaultConfig) {
  if (existsSync(ROOT_WEBPACK_CONFIG_FILE)) {
    const config = require(ROOT_WEBPACK_CONFIG_FILE);
    const customMerge = mergeWithCustomize({
      customizeArray(arr1, arr2) {
        return _.uniqWith([...arr1, ...arr2], _.isEqual);
      }
    })

    // 如果是函数形式，可能并不仅仅是添加额外的处理流程，而是在原有流程上进行修改
    // 比如修改markdown-loader,添加options.enableMetaData
    if (typeof config === 'function') {
      return customMerge(defaultConfig, config(defaultConfig));
    }

    return customMerge(defaultConfig, config);
  }

  return defaultConfig;
}

const COMPILER_TYPE_MAP = ['vue2','vue3','react']

const getCompilerType = (type,version)=>{
  let compilerType = type + version;
  if(compilerType.includes('react')){
    compilerType = 'react'
  }
  if(!COMPILER_TYPE_MAP.includes(compilerType)){
    compilerType = 'vue2'
  }
  return compilerType
}

exports.COMPILER_TYPE_MAP = COMPILER_TYPE_MAP;

exports.ENTRY_EXTS = ENTRY_EXTS;

exports.getCompilerType = getCompilerType

exports.smartOutputFile = (filePath,content)=>{
  if(existsSync(filePath)){
    const previousContent = readFileSync(filePath,'utf-8')
    if(previousContent === content){
      return 
    }
  }
  outputFileSync(filePath,content)
}

exports.getComponents = function () {
  const dirs = readdirSync(SRC_DIR);

  return dirs
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const path = join(SRC_DIR, dir, `index.${ext}`);
        if (existsSync(path)) {
          return hasDefaultExport(readFileSync(path, 'utf-8'));
        }

        return false;
      })
    );
}

exports.pascalize = pascalize
exports.camelize = camelize
exports.hasDefaultExport = hasDefaultExport
exports.normalizePath = normalizePath
exports.getHoiConfig = getHoiConfig

exports.setModuleEnv = setModuleEnv
exports.setNodeEnv = setNodeEnv
exports.setBuildTarget = setBuildTarget

exports.isDir = isDir
exports.isDemoDir = isDemoDir
exports.isTestDir = isTestDir

exports.isAsset = isAsset
exports.isVueSfc = isVueSfc
exports.isReactSfc = isReactSfc
exports.isStyle = isStyle
exports.isScript = isScript
exports.replaceExt = replaceExt

exports.getWebpackConfig = getWebpackConfig

exports.setCompilerType = setCompilerType