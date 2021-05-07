'use strict';

const fastifyPlugin = require('fastify-plugin');
const metricsPlugin = require('fastify-metrics');


async function metricsCollector (fastify) {
  fastify.register(metricsPlugin, { endpoint: '/metrics' });
}

module.exports = fastifyPlugin(metricsCollector);