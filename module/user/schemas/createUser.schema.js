const bodyJsonSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  }
}

const response = {
  201: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'array'},
      id: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
    }
  }
}

const schema = {
  body: bodyJsonSchema,
  response: response
}

module.exports = schema

