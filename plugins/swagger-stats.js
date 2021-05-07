'use strict';

const fastifyPlugin = require('fastify-plugin');
const swagger = require('../docs/swagger')
const swStats = require('swagger-stats');
const swsOptions = {
  name: 'swagger-stats-fastify',
  version: '0.95.19',
  timelineBucketDuration: 1000,
  swaggerSpec: swagger.options,
  authentication: true,
  sessionMaxAge: process.env.SWS_AUTHTEST_MAXAGE || 900
};

async function swaggerStatsPlugin(fastify) {
  fastify.register(require('middie')).then(()=>{
      fastify.register(swStats.getFastifyPlugin, {swaggerSpec: swsOptions.swaggerSpec});
  });

  fastify.get('/stats', function (req, reply) {
      reply.send(swStats.getCoreStats());
  });
}

module.exports = fastifyPlugin(swaggerStatsPlugin);