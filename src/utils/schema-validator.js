const errorFactory = require('../utils/logging/error-factory')

const validateRequest = (contextPart, label, schema, options) => {
  if (!schema) return
  const { error } = schema.validate(contextPart, options)
  if (error) {
    throw errorFactory.UnknownError(`Invalid ${label} - ${error.message}`)
  }
}

// middleware de validación que usaremos para validar los request pasándole un determinado esquema
const validate = (schema) => (ctx, next) => {
  try {
    validateRequest(ctx.headers, 'Headers', schema.headers, { allowUnknown: true })
    validateRequest(ctx.params, 'URL Parameters', schema.params)
    validateRequest(ctx.query, 'URL Query', schema.query)
    if (ctx.request.body) {
      validateRequest(ctx.request.body, 'Request Body', schema.body)
    }
    return next()
  } catch (error) {
    throw errorFactory.InvalidInputError(`Solicitud no válida: ${error.message}`)
  }
}

module.exports = validate
