const Joi = require("joi");

const eoloplantCreateBodySchema = Joi.object({
  city: Joi.string().required(),
});

const idRequestParamSchema = Joi.object({
  id: Joi.number().required(),
});

const validateSchema = (schema, payload) => {
  const { error } = schema.validate(payload);

  if (error) {
    throw {
      status: 400,
      message: error.details.map((err) => err.message).join(","),
    };
  }
};

module.exports = {
  validateSchema,
  eoloplantCreateBodySchema,
  idRequestParamSchema
};
