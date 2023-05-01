const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { mongooseError } = require("../utils");

const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userSchema.post("save", mongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).trim().required(),
  password: Joi.string().min(5).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).trim().required(),
  password: Joi.string().min(5).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).trim().required(),
});

const subSchema = Joi.object({
  subscription: Joi.string()
    .valid(...["starter", "pro", "business"])
    .messages({
      "*": "fail",
    }),
});

module.exports = {
  User,
  registerSchema,
  loginSchema,
  subSchema,
  emailSchema,
};
