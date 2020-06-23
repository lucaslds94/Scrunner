const { celebrate, Segments, Joi } = require("celebrate");

const storeBoardValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      days: Joi.string().required(),
    }),
  },
  {
    abortEarly: false,
  }
);

const storeContentValidator = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      task_points: Joi.string().required(),
      task_column: Joi.string().required(),
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
  storeBoardValidator,
  storeContentValidator,
  updateContentValidator,
};
