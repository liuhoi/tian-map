const {remove, copy, readdirSync, existsSync} = require('fs-extra')
const {join,relative} = require('path')

const {clean} = require('./clean')

const {
  setNodeEnv,
  setModuleEnv,
  setBuildTarget,
  isDir,
  isDemoDir,
  isTestDir,
  isAsset,
  isVueSfc,
  isStyle,
  isScript,
  setCompilerType,
  getCompilerType
} = require('../common')
const {installDependencies} = require('../common/manager')
const {consola,ora} = require('../common/logger')
const { SRC_DIR, LIB_DIR, ES_DIR } =require('../common/constant');
const { CSS_LANG } =  require('../common/css');

const {genPackageEntry} = require('../compiler/gen-package-entry')
const {genPackageStyle} = require('../compiler/gen-package-style')

const {compileSfc} = require('../compiler/compile-sfc')
const {compileJs} = require('../compiler/compile-js')
const {compileStyle} = require('../compiler/compile-style')

const {genStyleDepsMap} = require('../compiler/gen-style-deps-map')
const {genComponentStyle} = require('../compiler/gen-component-style')

const {compilePackage} =  require('../compiler/compile-package')

const compileFile = async (filePath) => {
  if (isVueSfc(filePath)) {
    return compileSfc(filePath);
  }

  if (isScript(filePath)) {
    return compileJs(filePath);
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }

  if (isAsset(filePath)) {
    return Promise.resolve();
  }

  return remove(filePath)
}

const compileDir = async (dir)=>{
  const files = readdirSync(dir);
  await Promise.all(
    files.map(filename => {
      const filePath = join(dir,filename)
      if(isDemoDir(filePath) || isTestDir(filePath)){
        return remove(filePath)
      }
      if(isDir(filePath)){
        return compileDir(filePath)
      }
      return compileFile(filePath)
    })
  )
}


const copySourceCode = async () => {
  await copy(SRC_DIR, ES_DIR);
  await copy(SRC_DIR, LIB_DIR);
}

const buildPackageScriptEntry = async ()=>{
  const esEntryFile = join(ES_DIR, 'index.js');
  const libEntryFile = join(LIB_DIR, 'index.js');

  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path) => `./${relative(SRC_DIR, path)}`,
  });

  await copy(esEntryFile, libEntryFile);
}

const buildStyleEntry = async ()=>{
  await genStyleDepsMap();
  genComponentStyle();
}

const buildPackageStyleEntry = async ()=>{
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`);

  genPackageStyle({
    outputPath: styleEntryFile,
    pathResolver: (path) => path.replace(SRC_DIR, '.'),
  });
}

const buildTypeDeclarations = async ()=>{
  
}

const buildESMOutputs = async ()=>{
  setModuleEnv('esmodule');
  setBuildTarget('package');
  await compileDir(ES_DIR);
}

const buildCJSOutputs = async ()=>{
  setModuleEnv('commonjs');
  setBuildTarget('package');
  await compileDir(LIB_DIR);
}

const buildBundledOutputs = async ()=>{
  setModuleEnv('esmodule');
  await compilePackage(false);
  await compilePackage(true);
}



const tasks = [
  {
    text: 'Copy Source Code',
    task: copySourceCode,
  },
  {
    text: 'Build Package Script Entry',
    task: buildPackageScriptEntry,
  },
  {
    text: 'Build Component Style Entry',
    task: buildStyleEntry,
  },
  {
    text: 'Build Package Style Entry',
    task: buildPackageStyleEntry,
  },
  {
    text: 'Build Type Declarations',
    task: buildTypeDeclarations,
  },
  {
    text: 'Build ESModule Outputs',
    task: buildESMOutputs,
  },
  {
    text: 'Build CommonJS Outputs',
    task: buildCJSOutputs,
  },
  {
    text: 'Build Bundled Outputs',
    task: buildBundledOutputs,
  },
];


const runBuildTasks = async ()=>{
  for(let { task, text } of tasks){
    const spinner = ora(text).start();
    try {
      await task();
      spinner.succeed(text);
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw err;
    }
  }
  consola.success('Compile successfully');
}



module.exports = async function(type,options){
  setCompilerType(getCompilerType(type,options.version))
  setNodeEnv('production');
  try {
    await clean();
    await installDependencies();
    await runBuildTasks();

  } catch (error) {
    console.error('Build failed');
    process.exit(1)
  }
}