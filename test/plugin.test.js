const tap = require('tap')
const test = tap.test
const Fastify = require('fastify')
const plugin = require('../index')

test('should send json if callback doesnt exist in query', (t) => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/test', (req, reply) => {
    reply.jsonp({ hello: 'world' })
  })

  fastify.inject({
    method: 'GET',
    url: '/test'
  }, (err, res) => {
    t.error(err)
    t.same(JSON.parse(res.body), { hello: 'world' })
  })
})

test('should send jsonp with callback', (t) => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/test', (req, reply) => {
    reply.jsonp({ foo: 'bar' })
  })

  fastify.inject({
    method: 'GET',
    url: '/test?callback=myCb'
  }, (err, res) => {
    t.error(err)
    t.same(res.body, '/**/ typeof myCb === \'function\' && myCb({"foo":"bar"});')
  })
})

test('should send jsonp with custom callback name', (t) => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/test', (req, reply) => {
    reply.jsonp({ baz: 'bar' }, { callbackName: 'cb' })
  })

  fastify.inject({
    method: 'GET',
    url: '/test?cb=myCallback'
  }, (err, res) => {
    t.error(err)
    t.same(res.body, '/**/ typeof myCallback === \'function\' && myCallback({"baz":"bar"});')
  })
})

test('should send jsonp for first callback in params array', (t) => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(plugin)

  fastify.get('/test', (req, reply) => {
    reply.jsonp(null, { callbackName: 'cb' })
  })

  fastify.inject({
    method: 'GET',
    url: '/test?cb=cb1&cb=cb2'
  }, (err, res) => {
    t.error(err)
    t.same(res.body, '/**/ typeof cb1 === \'function\' && cb1(null);')
  })
})
