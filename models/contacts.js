const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { mongooseError } = require("../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

// якщо при валідації mongoose.Schema під час збереження данних сталася помилка,
// статус помилки не записується і за замовчуванням є 500,
// пишемо функцію яка записує статус 400' - це мідлвара mongoose
contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

const validationSchemaAdd = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim()
    .required(),
  phone: Joi.string().min(5).trim().required(),
  favorite: Joi.boolean(),
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
  favorite: Joi.boolean(),
});

const validationSchemaFavoriteUpdate = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = {
  Contact,
  validationSchemaAdd,
  validationSchemaFavoriteUpdate,
  validationSchemaUpdate,
};
