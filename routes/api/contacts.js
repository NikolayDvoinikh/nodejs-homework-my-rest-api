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

const { validateBody } = require("../../utils");

const router = express.Router();

router.get("/", ctrlListContact);

router.get("/:contactId", ctrlGetContactById);

router.post("/", validateBody(validationSchemaAdd, "add"), ctrlAddContact);

router.delete("/:contactId", ctrlRemoveContact);

router.put(
  "/:contactId",
  validateBody(validationSchemaUpdate),
  ctrlUpdateContact
);

router.patch(
  "/:contactId/favorite",
  validateBody(validationSchemaFavoriteUpdate),
  ctrlUpdateStatusContact
);

module.exports = router;
