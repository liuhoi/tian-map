const { render, FileManager } = require( 'less');
const { readFileSync } = require( 'fs-extra');

// less plugin to resolve tilde
class TildeResolver extends FileManager {
  loadFile(filename, ...args) {
    filename = filename.replace('~', '');
    return FileManager.prototype.loadFile.apply(this, [filename, ...args]);
  }
}

const TildeResolverPlugin = {
  install(lessInstance, pluginManager) {
    pluginManager.addFileManager(new TildeResolver());
  },
};

const compileLess = async (filePath) => {
  const source = readFileSync(filePath, 'utf-8');
  const { css } = await render(source, {
    filename: filePath,
    plugins: [TildeResolverPlugin],
  });

  return css;
}

exports.compileLess = compileLess