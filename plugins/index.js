'use strict';

const dbPlugin = require('../plugins/mongo.connector')
const metricsPlugin = require('../plugins/metrics');
const swaggerDocPlugin = require('./swagger-doc');
const swaggerStatsPlugin = require('./swagger-stats');

module.exports = {
  /**
   * @function
   * @description fastify plugins
   * @param {fastify.Application} app
   * @returns void
   */
  init(app) {
    // Security for requests
    app.register(dbPlugin),
    // Metrics for http
    app.register(metricsPlugin)
    //swagger plugin
    app.register(swaggerDocPlugin)
    // swagger stats
    app.register(swaggerStatsPlugin)
  }
};