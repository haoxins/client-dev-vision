
'use strict'

const router = require('koa-router')()
const logger = require('koa-logger')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

const Redis = require('ioredis')
const redis = new Redis()

app.use(logger())
app.use(serve('.'))

router.get('/dyc/:dir/:file', async function(ctx, next) {
  const { dir, file } = ctx.params
  ctx.type = 'js'
  ctx.body = await redis.get(`${dir}.${file}`)
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3003)
console.info('listen 3003')
