'use strict';

const UserRepo = require("../../repositories/users.repo");

/**
 * @function findAll
 * @param {fastify.Request} req
 * @param {fastify.Reply} reply
 * @returns {Promise < void >}
 */
async function findAll(req, reply) {
    try {
        const database = this.mongo.db(process.env.MONGO_DATABASE_NAME);
        const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION_NAME);
        const data = await UserRepo.getUsers(usersCollection);
        const page = Number(req.query.page)
        const count = Number(req.query.count)
        if(!!page && !!count){
            const everyPagelength = 3
            let startIdx = page > 1 ? (page - 1)*everyPagelength : 0
            let endIdx = startIdx + (count > everyPagelength ? everyPagelength : count)
            if(startIdx > data.length){
                startIdx = 0
                endIdx = data.length
            }
            const pageData = data.slice(startIdx, endIdx)
            reply.code(201).type('json').send(JSON.stringify(pageData))
        }else{
            reply.code(201).type('json').send(JSON.stringify(data))
        }
    } catch (error) {
        reply.code(500).type('json').send(error);
    }
}

/**
 * @function findById
 * @param {fastify.Request} req
 * @param {fastify.Reply} reply
 * @returns {Promise < void >}
 */
async function findById(req, reply) {
    try {
        const userId = req.params.id
        const database = this.mongo.db(process.env.MONGO_DATABASE_NAME);
        const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION_NAME);
        const data = await UserRepo.getUserById(usersCollection, userId);
        reply.code(201).type('json').send(JSON.stringify(data));
    } catch (error) {
        reply.code(error.statusCode || 500).send(error);
    }
}

/**
 * @function create
 * @param {fastify.Request} req
 * @param {fastify.Reply} reply
 * @returns {Promise < void >}
 */
async function create(req, reply) {
    try {
        const database = this.mongo.db(process.env.MONGO_DATABASE_NAME);
        const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION_NAME);
        const data = await UserRepo.createUser(usersCollection, req.body);
        reply.code(201).type('json').send(JSON.stringify(data));
    } catch (error) {
        reply.code(error.statusCode || 500).send(error);
    }
}

/**
 * @function deleteAll
 * @param {fastify.Request} req
 * @param {fastify.Reply} reply
 * @returns {Promise < void >}
 */
async function deleteAll(req, reply) {
    const database = this.mongo.db(process.env.MONGO_DATABASE_NAME);
    const usersCollection = database.collection(process.env.MONGO_USERS_COLLECTION_NAME);
    await UserRepo.deleteAllUsers(usersCollection)
    const data = {
        text: 'deleted all users'
    }
    try {
        reply.code(201).type('json').send(JSON.stringify(data));
    } catch (error) {
        reply.code(500).type('json').send(error);
    }
}

module.exports = {
    create,
    findAll,
    findById,
    deleteAll,
};