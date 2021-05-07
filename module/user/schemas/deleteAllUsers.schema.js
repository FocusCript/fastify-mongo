const response = {
  201: {
    type: 'object',
    properties: {
      text: { type: 'string' },
    }
  }
}

const schema = {
  response: response
}

module.exports = schema