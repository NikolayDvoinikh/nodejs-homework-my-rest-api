const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const validationSchema = Joi.object({
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

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.details[0].context.key} field`
      );
    }
    const result = await addContact(req.body);
    if (!result) {
      throw HttpError(400);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }

    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    const { error } = validationSchemaUpdate.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
