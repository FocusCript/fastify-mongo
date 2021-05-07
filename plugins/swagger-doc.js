'use strict';

const fastifyPlugin = require('fastify-plugin');
const swagger = require('../docs/swagger')

async function swaggerDocPlugin(fastify) {
  fastify.register(require('fastify-swagger'), swagger.options)
}

module.exports = fastifyPlugin(swaggerDocPlugin);