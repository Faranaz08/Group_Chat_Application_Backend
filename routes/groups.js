const express = require("express");
const userAuthentication = require("../middleware/auth");
const groupController = require("../controllers/group");

const router = express.Router();

router.get(
  "/",
  userAuthentication.authenticateToken,
  groupController.getGroups
);

module.exports = router;
