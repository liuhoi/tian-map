module.exports = {
  presets: [
    [
      '@liuhoi/hoipack-cli/preset',
      {
        loose: process.env.BUILD_TARGET === 'package',
        enableObjectSlots: false,
      },
    ],
  ],
};
