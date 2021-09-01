const { get } = require('lodash');
const { join } = require( 'path');
const {
  pascalize,
  getComponents,
  smartOutputFile,
  normalizePath,
} = require( '../common');
const { SRC_DIR, getPackageJson, getHoiConfig } = require( '../common/constant');


function getPathByName(name, pathResolver) {
  let path = join(SRC_DIR, name);
  if (pathResolver) {
    path = pathResolver(path);
  }
  return normalizePath(path);
}

function genImports(
  names,
  pathResolver,
  namedExport
) {
  return names
    .map((name) => {
      const pascalName = pascalize(name);
      const importName = namedExport ? `{ ${pascalName} }` : pascalName;
      const importPath = getPathByName(name, pathResolver);

      return `import ${importName} from '${importPath}';`;
    })
    .join('\n');
}

function genExports(
  names,
  pathResolver,
  namedExport
) {
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

function genPackageEntry({
  outputPath,
  pathResolver,
}) {
  const names = getComponents();
  const vantConfig = getHoiConfig();

  const namedExport = get(vantConfig, 'build.namedExport', false);
  const skipInstall = get(vantConfig, 'build.skipInstall', []).map(pascalize);

  const version = process.env.PACKAGE_VERSION || getPackageJson().version;

  const components = names.map(pascalize);
  const content = `${genImports(names, pathResolver, namedExport)}

const version = '${version}';

function install(app) {
  const components = [
    ${components.filter((item) => !skipInstall.includes(item)).join(',\n    ')}
  ];

  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

${genExports(names, pathResolver, namedExport)}

export default {
  install,
  version
};
`;

  smartOutputFile(outputPath, content);
}


exports.genPackageEntry = genPackageEntry