const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    next(HttpError(404));
  }

  next();
};

module.exports = isValidId;
