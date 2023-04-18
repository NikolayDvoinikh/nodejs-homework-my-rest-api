const { Contact } = require("../models");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../utils");

const ctrlListContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  if (!favorite) {
    const result = await Contact.find({ owner }, "-owner", {
      skip,
      limit,
    });
    res.json(result);
    return;
  }
  const filteredResult = await Contact.find({ owner, favorite }, "-owner", {
    skip,
    limit,
  });
  res.json(filteredResult);
};

const ctrlGetContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const ctrlAddContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
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
  const { body, params } = req;
  if (!Object.keys(body).length || !body) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(params.contactId, body, {
    new: true,
  });

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
