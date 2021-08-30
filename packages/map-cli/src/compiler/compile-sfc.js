const hash = require('hash-sum')
const {parse} = require('path')
const {remove, writeFileSync, readFileSync} = require('fs-extra')


const compileSfc = async (filePath)=>{
  const source = readFileSync(filePath, 'utf-8');
  const tasks =  await remove(filePath);
}

exports.compileSfc = compileSfc
