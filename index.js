  
const fastify = require('./server/server');

const start = async () => {
      try {
        await fastify.listen(process.env.PORT || 5000, '0.0.0.0')
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    }
    
start()


