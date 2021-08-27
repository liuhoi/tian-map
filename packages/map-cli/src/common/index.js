const {
  lstatSync,
  existsSync,
  readdirSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra');
const {join} = require('path')

const {SRC_DIR,getHoiConfig} = require('./constant')

const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

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

exports.ENTRY_EXTS = ENTRY_EXTS;


exports.setNodeEnv = function(value){
  process.env.NODE_ENV = value;
}
exports.setBuildTarget = (value) => {
  process.env.BUILD_TARGET = value;
}

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