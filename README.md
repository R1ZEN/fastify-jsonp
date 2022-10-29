# @pbe/fastify-jsonp

[![checks](https://github.com/R1ZEN/fastify-jsonp/actions/workflows/checks.yml/badge.svg?branch=master)](https://github.com/R1ZEN/fastify-jsonp/actions/workflows/checks.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/)
![npm](https://img.shields.io/npm/v/@pbe/fastify-jsonp?label=npm%20version)
![npm bundle size](https://img.shields.io/bundlephobia/min/@pbe/fastify-jsonp)


A plugin for [Fastify](http://fastify.io/) that adds support for [jsonp](https://en.wikipedia.org/wiki/JSONP#JSONP) response.

> jsonp method in reply is compatible with [express](https://expressjs.com/en/5x/api.html#res.jsonp)

## Installation

```sh
npm i @pbe/fastify-jsonp
```

or

```sh
yarn add @pbe/fastify-jsonp
```

## Example

```js
const fastify = require('fastify')()

fastify.register(require('@pbe/fastify-jsonp'))

fastify.get('/', (req, reply) => {
  reply.jsonp({ hello: 'world' });
});

fastify.listen({ port: 3000 });
```

Terminal:
```sh
$ curl "http://localhost:3000/?callback=myCallback"
$ /**/ typeof myCallback === 'function' && myCallback({"hello":"world"});
```

## License

[MIT License](http://jsumners.mit-license.org/)