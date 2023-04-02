const { HttpError } = require("../helpers");

const Joi = require("joi");

const validationSchemaAdd = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim()
    .required(),
  phone: Joi.string().trim().min(5).required(),
});

const validationSchemaUpdate = Joi.object({
  name: Joi.string().trim().min(3),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim(),
  phone: Joi.string().trim().min(5),
});

const validAddContact = (req, res, next) => {
  const { error } = validationSchemaAdd.validate(req.body);
  if (error) {
    throw HttpError(
      400,
      `missing required ${error.details[0].context.key} field`
    );
  }
  next();
};

const validUpdateContact = (req, res, next) => {
  const { error } = validationSchemaUpdate.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = {
  validAddContact,
  validUpdateContact,
};
