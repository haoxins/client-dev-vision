
'use strict'

const Builder = require('systemjs-builder')
const n = require('path').resolve

const builder = new Builder(n('./'))

const Redis = require('ioredis')
const redis = new Redis()

;(async function() {

  await build('component/app.js')
  await build('constant/common.js')
  await build('module/track.js')

  console.info('build complete')
  process.exit(0)
}())

async function build(name) {
  const result = await builder.bundle(name, 'build/' + name)
  const key = name.replace(/\//g, '.')
  await redis.set(key, result.source)
}
