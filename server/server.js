const fastify = require('fastify');
const routes = require('../route');
const middleware = require('../middleware');
const applyConfig = require('dotenv').config;
const plugins = require('../plugins');

/**
 * @type {fastify}
 * @constant {fastify.Application}
 */
const app = fastify({ logger: true });

(async () => {
    /**
     * @description fastify.Application Set ENV
     */
    
    applyConfig();
    /**
     * @description fastify.Application Middleware
     */
    middleware.init(app);

    /**
     * @description fastify.Application Plugins
     */
    plugins.init(app)

    /**
     * @description fastify.Application Routes
     */
    routes.init(app);
})();

module.exports = app;