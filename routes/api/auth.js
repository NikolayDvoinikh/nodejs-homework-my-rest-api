const express = require("express");

const router = express.Router();

const { registerSchema, loginSchema, subSchema } = require("../../models");
const { validateBody } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");

const {
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers");

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, current);

router.patch(
  "/subscription",
  authenticate,
  validateBody(subSchema),
  updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
