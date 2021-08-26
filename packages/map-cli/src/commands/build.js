const {setNodeEnv} = require('../common')
const {clean} = require('./clean')
const {installDependencies} = require('../common/manager')

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


const runBuildTasks = ()=>{
  
}



module.exports = async function(){
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