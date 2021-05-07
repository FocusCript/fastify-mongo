'use strict';

const MongoObjectId = require('mongodb').ObjectID;

const appendIdToMongoItem = item => ({
  ...item,
  id: item._id.toString()
});

const MapMongoItemToDto = (mongoItem) => {
  let dto = appendIdToMongoItem(mongoItem);

  delete dto._id;
  delete dto.upperCasedEmail;

  return dto;
}


async function getUsers(col, offset = 0, limit = 100) {
  let users = await col
    .find()
    .skip(offset)
    .limit(limit)
    .toArray();
  return users.map(MapMongoItemToDto);
}

async function getUserById(col, bannerId) {
  const _id = new MongoObjectId(bannerId);

  const foundedUser = await col.findOne({ _id });

  if (foundedUser === null) {
    const notFoundError = new Error();
    notFoundError.statusCode = 404;
    notFoundError.message = 'User was not found';
    throw notFoundError;
  }

  return MapMongoItemToDto(foundedUser);
}

async function createUser(col, newUser) {
  const upperCasedUserEmail = newUser.email.toUpperCase();

  const userWithSameEmail = await col.findOne({ upperCasedEmail: upperCasedUserEmail });

  if (userWithSameEmail !== null) {
    const duplicateError = new Error();
    duplicateError.statusCode = 400;
    duplicateError.message = `User with email '${newUser.email}' already exists`;
    throw duplicateError;
  }

  const dateTimeNow = new Date().toLocaleString('lt-LT');
  const newUserDocument = {
    ...newUser,
    upperCasedEmail: upperCasedUserEmail,
    createdAt: dateTimeNow,
    updatedAt: dateTimeNow,
  };

  await col.insertOne(newUserDocument);

  return MapMongoItemToDto(newUserDocument);
}

async function deleteAllUsers(col){
  await col.deleteMany({})
}


  module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteAllUsers
  }