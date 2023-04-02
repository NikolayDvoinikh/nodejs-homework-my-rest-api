const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { HttpError } = require("../helpers");

const ctrlListContact = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlGetContactById = async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlAddContact = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    if (!result) {
      throw HttpError(400);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlUpdateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }

    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const ctrlRemoveContact = async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ctrlListContact,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlUpdateContact,
  ctrlRemoveContact,
};
