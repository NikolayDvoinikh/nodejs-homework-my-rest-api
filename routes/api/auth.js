const express = require("express");

const router = express.Router();

const { registerSchema, loginSchema, subSchema } = require("../../models");
const { validateBody } = require("../../utils");
const { authenticate } = require("../../middlewares");

const {
  register,
  login,
  current,
  logout,
  updateSubscription,
} = require("../../controllers");

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", authenticate, logout);

router.post("/current", authenticate, current);

router.patch("/", authenticate, validateBody(subSchema), updateSubscription);

module.exports = router;
