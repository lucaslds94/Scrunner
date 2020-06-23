const { celebrate, Segments, Joi } = require("celebrate");

const storeContentValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      did_yesterday: Joi.string().allow("", null),
      do_today: Joi.string().allow("", null),
      problems: Joi.string().allow("", null),
    }),
  },
  {
    abortEarly: false,
  }
);

module.exports = {
  storeContentValidator,
};
