const express = require("express");

const {
  ctrlListContact,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlUpdateContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
} = require("../../controllers");

const {
  validationSchemaAdd,
  validationSchemaFavoriteUpdate,
  validationSchemaUpdate,
} = require("../../models");

const { isValidId } = require("../../middlewares");

const { validateBody } = require("../../utils");

const router = express.Router();

router.get("/", ctrlListContact);

router.get("/:contactId", isValidId, ctrlGetContactById);

router.post("/", validateBody(validationSchemaAdd, "add"), ctrlAddContact);

router.delete("/:contactId", ctrlRemoveContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(validationSchemaUpdate),
  ctrlUpdateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(validationSchemaFavoriteUpdate),
  ctrlUpdateStatusContact
);

module.exports = router;
