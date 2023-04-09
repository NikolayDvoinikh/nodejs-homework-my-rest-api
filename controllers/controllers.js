const { Contact } = require("../models");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const ctrlListContact = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const ctrlGetContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const ctrlAddContact = async (req, res) => {
  const result = await Contact.create(req.body);
  if (!result) {
    throw HttpError(400);
  }
  res.status(201).json(result);
};

const ctrlUpdateContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const ctrlUpdateStatusContact = async (req, res) => {
  if (!Object.keys(req.body).length || !req.body.favorite) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const ctrlRemoveContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  ctrlListContact: ctrlWrapper(ctrlListContact),
  ctrlAddContact: ctrlWrapper(ctrlAddContact),
  ctrlGetContactById: ctrlWrapper(ctrlGetContactById),
  ctrlUpdateContact: ctrlWrapper(ctrlUpdateContact),
  ctrlRemoveContact: ctrlWrapper(ctrlRemoveContact),
  ctrlUpdateStatusContact: ctrlWrapper(ctrlUpdateStatusContact),
};
