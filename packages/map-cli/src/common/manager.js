const {execSync} = require('child_process')

let hasYarnCache;

const hasYarn = ()=>{
  if(hasYarnCache == null){
    try {
      execSync('yarn --version',{
        stdio:'ignore'
      })
      hasYarnCache = true
    } catch (error) {
      hasYarnCache = false
    }
  }
  return hasYarnCache
}

const installDependencies = async ()=>{
  console.log('Install Dependencies\n');
  try {
    const manager = hasYarn() ? 'yarn' : 'npm';

    execSync(`${manager} install`)

    console.log(`${manager} Install Dependencies End\n`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

exports.installDependencies = installDependencies