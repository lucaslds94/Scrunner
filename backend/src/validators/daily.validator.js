const { celebrate, Segments, Joi } = require("celebrate");

const storeContentValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      did_yesterday: Joi.string(),
      do_today: Joi.string(),
      problems: Joi.string(),
    }),
  },
  {
    abortEarly: false,
  }
);

const updateContentValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      columnId: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

module.exports = {
  storeContentValidator,
};
