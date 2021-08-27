const {
  lstatSync,
  existsSync,
  readdirSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra')

const {join} =require('path')

const {SRC_DIR} = require('../common/constant')

const {getComponents,pascalize,smartOutputFile,normalizePath} = require('../common')

const getPathByName = (name,pathResolver)=>{
  let path = join(SRC_DIR, name);
  if (pathResolver) {
    path = pathResolver(path);
  }
  return normalizePath(path);
}

const genImports = (
  names, 
  pathResolver, 
  namedExport
)=>{
  return names
  .map((name) => {
    const pascalName = pascalize(name);
    const importName = namedExport ? `{ ${pascalName} }` : pascalName;
    const importPath = getPathByName(name, pathResolver);

    return `import ${importName} from '${importPath}';`;
  })
  .join('\n');
}

const genExports = (
  names, 
  pathResolver, 
  namedExport
)=>{
  if (namedExport) {
    const exports = names
      .map((name) => `export * from '${getPathByName(name, pathResolver)}';`)
      .join('\n');

    return `
      export {
        install,
        version,
      };
      ${exports}
    `;
  }

  return `
    export {
      install,
      version,
      ${names.map(pascalize).join(',\n  ')}
    };
  `;
}

const genPackageEntry = ({
  outputPath,
  pathResolver,
})=>{
  const names = getComponents();
  const components = names.map(pascalize); 
  const version = '0.0.1'
  const content = `

    ${genImports(names, pathResolver, true)}

    const version = '${version}'
    const install = function(Vue, opts = {}) {
      const components = [
        ${components.join(',')}
      ];
      components.forEach(component => {
        Vue.component(component.name, component);
      });
    };

    ${genExports(names, pathResolver, true)}

    export default {
      install,
      version
    };  
  `;
  smartOutputFile(outputPath, content);
}

exports.genPackageEntry = genPackageEntry