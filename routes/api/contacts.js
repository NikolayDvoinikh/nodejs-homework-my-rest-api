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

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils");

const router = express.Router();

router.get("/", authenticate, ctrlListContact);

router.get("/:contactId", authenticate, isValidId, ctrlGetContactById);

router.post(
  "/",
  authenticate,
  validateBody(validationSchemaAdd, "add"),
  ctrlAddContact
);

router.delete("/:contactId", authenticate, ctrlRemoveContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(validationSchemaUpdate),
  ctrlUpdateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(validationSchemaFavoriteUpdate),
  ctrlUpdateStatusContact
);

module.exports = router;
