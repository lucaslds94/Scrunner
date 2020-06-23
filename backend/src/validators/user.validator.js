const { celebrate, Segments, Joi } = require("celebrate");

const storeUserValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      is_owner: Joi.boolean().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

const updateUserValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      oldPassword: Joi.string().allow("", null),
      password: Joi.string().allow("", null),
      image: Joi.string().allow("", null),

    }),
  },
  {
    abortEarly: false,
  }
);

module.exports = { storeUserValidator, updateUserValidator };
