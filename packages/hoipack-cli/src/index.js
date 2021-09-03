#!/usr/bin/env node
const {program} = require('commander')
const version = require('../package.json').version
const dev = require('./commands/dev')
const build = require('./commands/build')
const buildSite = require('./commands/build-site')
const release = require('./commands/release')

program.version(version)

program
  .command('dev')
  .argument('[type]', '编译成语言', 'vue')
  .option('-v, --version <version>', '编译版本', 2 )
  .description('Run webpack dev server')
  .action(dev);
program
  .command('build-site')
  .description('Compile site in production mode')
  .action(buildSite);

program
  .command('build')
  .description('Compile packages')
  .action(build);
program
  .command('release')
  .description('Compile components and release it')
  .action(release);


program.parse(process.argv)