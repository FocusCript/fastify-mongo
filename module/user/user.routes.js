'use strict';

const createUserSchema = require('./schemas/createUser.schema')
const getUserSchema = require('./schemas/getUsers.schema')
const getUserById = require('./schemas/getUserById.schema')
const deleteAllUsers = require('./schemas/deleteAllUsers.schema')

const Users = require('./user.controller');

module.exports = async function (fastify) {
  fastify.get('/users', { schema: getUserSchema }, Users.findAll);
  fastify.post('/register', { schema: createUserSchema }, Users.create);
  fastify.get('/cleanup', { schema: deleteAllUsers }, Users.deleteAll);
  fastify.get('/user/:id', { schema: getUserById }, Users.findById);
};