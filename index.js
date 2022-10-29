'use strict'

const fp = require('fastify-plugin')

const fastifyJSONP = (fastify, opts, next) => {
  /**
   * Send JSON response with JSONP callback support.
   *
   * Examples:
   *
   *     res.jsonp(null);
   *     res.jsonp({ user: 'tj' });
   *
   * @param {string|number|boolean|object} obj
   * @public
   */
  fastify.decorateReply('jsonp', function (value, options) {
    const { callbackName = 'callback' } = options || {}

    // settings
    let body = this.serialize(value)
    let callback = this.request.query[callbackName]

    // fixup callback
    if (Array.isArray(callback)) {
      callback = callback[0]
    }

    // jsonp
    if (typeof callback === 'string' && callback.length !== 0) {
      this.header('X-Content-Type-Options', 'nosniff')
      this.header('Content-Type', 'text/javascript')

      // restrict callback charset
      callback = callback.replace(/[^\w$.[\]]/g, '')

      body = body.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')

      // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
      // the typeof check is just to reduce client error noise
      body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');'
    }

    return this.send(body)
  })

  next()
}

module.exports = fp(fastifyJSONP, { fastify: '>=3.x', name: '@pbe/fastify-jsonp' })
