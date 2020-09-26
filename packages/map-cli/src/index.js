#!/usr/bin/env node
const {program} = require('commander')
const version = require('../package.json').version

const dev = require('./commands/dev')
const buildSite = require('./commands/build-site')


program.version(version)

program
  .command('dev')
  .description('Run webpack dev server')
  .action(dev);
program
  .command('build-site')
  .description('Compile site in production mode')
  .action(buildSite);


program.parse(process.argv)