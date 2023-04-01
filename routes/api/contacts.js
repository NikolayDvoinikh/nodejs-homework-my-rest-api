const express = require("express");

const {
  ctrlListContact,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlUpdateContact,
  ctrlRemoveContact,
} = require("../../controllers");

const { validAddContact, validUpdateContact } = require("../../validation");

const router = express.Router();

router.get("/", ctrlListContact);

router.get("/:contactId", ctrlGetContactById);

router.post("/", validAddContact, ctrlAddContact);

router.delete("/:contactId", ctrlRemoveContact);

router.put("/:contactId", validUpdateContact, ctrlUpdateContact);

module.exports = router;
