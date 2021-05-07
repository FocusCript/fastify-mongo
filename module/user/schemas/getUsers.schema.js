const queryStringJsonSchema = {
  page: { type: 'integer' },
  count: { type: 'integer' }
}

const response = {
  201: {
   type: 'array',
   items: {
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
}

const schema = {
  response: response,
  querystring: queryStringJsonSchema,
}

module.exports = schema
