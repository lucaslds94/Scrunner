const { celebrate, Segments, Joi } = require("celebrate");

const storeTeamValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      category: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

const entryTeamValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      code: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

const updateTeamValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      category: Joi.string().required(),
      leader_id: Joi.number().allow("", null),
    }),
  },
  {
    abortEarly: false,
  }
);

module.exports = {
  storeTeamValidator,
  entryTeamValidator,
  updateTeamValidator,
};
