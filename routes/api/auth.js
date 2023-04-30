const express = require("express");

const router = express.Router();

const {
  registerSchema,
  loginSchema,
  subSchema,
  emailSchema,
} = require("../../models");
const { validateBody } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");

const {
  register,
  login,
  verificationEmail,
  resentVerificationEmail,
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

router.get("/verify/:verificationToken", verificationEmail);

router.post("/verify", validateBody(emailSchema), resentVerificationEmail);

module.exports = router;
