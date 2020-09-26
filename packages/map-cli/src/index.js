#!/usr/bin/env node
const {program} = require('commander')
const version = require('../package.json').version

const dev = require('./commands/dev')
const build = require('./commands/build')

program.version(version)

program
  .command('dev')
  .description('Run webpack dev server')
  .action(dev);

program
  .command('build')
  .description('Run webpack dev server')
  .action(build);


program.parse(process.argv)