const paramsJsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' }
  }
}

const response = {
  201: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string'},
      id: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
    }
  }
}

const schema = {
  params: paramsJsonSchema,
  response: response
}

module.exports = schema