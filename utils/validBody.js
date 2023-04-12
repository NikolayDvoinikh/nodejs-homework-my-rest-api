const { HttpError } = require("../helpers");

const validateBody = (schema, type) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      if (type === "add") {
        next(
          HttpError(
            400,
            `missing required ${error.details[0].context.key} field`
          )
        );
      }
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
