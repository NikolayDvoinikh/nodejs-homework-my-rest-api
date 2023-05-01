const {
  ctrlListContact,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlUpdateContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
} = require("./controllers");

const {
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
  verificationEmail,
  resentVerificationEmail,
} = require("./auth");

module.exports = {
  ctrlListContact,
  ctrlAddContact,
  ctrlGetContactById,
  ctrlUpdateContact,
  ctrlRemoveContact,
  ctrlUpdateStatusContact,
  register,
  login,
  current,
  logout,
  updateSubscription,
  updateAvatar,
  verificationEmail,
  resentVerificationEmail,
};
