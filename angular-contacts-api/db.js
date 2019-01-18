const fs = require('fs')
const util = require('util')
const {dbPath} = require('./config')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

exports.getDb = async () => {
  return JSON.parse(await readFile(dbPath, 'utf8'))
}

exports.saveDb = async (db) => {
  await writeFile(dbPath, JSON.stringify(db, null, '  '))
  return true
}
