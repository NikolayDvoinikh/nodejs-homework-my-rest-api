const {
  validationSchemaAdd,
  validationSchemaFavoriteUpdate,
  validationSchemaUpdate,
  Contact,
} = require("./contacts");

const { User, registerSchema, loginSchema, subSchema } = require("./user");

module.exports = {
  Contact,
  validationSchemaAdd,
  validationSchemaFavoriteUpdate,
  validationSchemaUpdate,
  User,
  registerSchema,
  loginSchema,
  subSchema,
};
