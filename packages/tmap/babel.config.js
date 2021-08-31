module.exports = {
  presets: [
    [
      '@hoi/map-cli/preset',
      {
        loose: process.env.BUILD_TARGET === 'package',
        enableObjectSlots: false,
      },
    ],
  ],
};
