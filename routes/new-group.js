const express = require("express");
const userAuthentication = require("../middleware/auth");
const groupChatController = require("../controllers/new-group");

const router = express.Router();

router.post(
  "/",
  userAuthentication.authenticateToken,
  groupChatController.postNewGroup
);

router.get(
  "/users",
  userAuthentication.authenticateToken,
  groupChatController.getUsers
);

router.get(
  "/add-user",
  userAuthentication.authenticateToken,
  groupChatController.addUserToGroup
);

router.delete(
  "/delete-user",
  userAuthentication.authenticateToken,
  groupChatController.deleteUserFromGroup
);

module.exports = router;
