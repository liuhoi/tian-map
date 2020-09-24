#!/usr/bin/env node
const {program} = require('commander')
const version = require('../package.json').version

const dev = require('./commands/dev')

program.version(version)

program
  .command('dev')
  .description('Run webpack dev server')
  .action(dev);

program.parse(process.argv)