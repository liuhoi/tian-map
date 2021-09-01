const releaseIt = require('release-it');
const { build }  = require('../commands/build');

class TMapCliReleasePlugin extends releaseIt.Plugin {
  async beforeRelease() {
    // log an empty line
    console.log('');

    await build();
  }
}

module.exports = TMapCliReleasePlugin;
