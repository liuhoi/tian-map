const releaseIt = require('release-it')
const { join } = require( 'path');

const PLUGIN_PATH = join(__dirname, '../compiler/map-cli-release-plugin.js');

const release =  async (command) => {
  await releaseIt({
    plugins: {
      [PLUGIN_PATH]: {},
    },
    npm: {
      tag: command.tag || 'latest',
    }
  });
}

exports.release = release