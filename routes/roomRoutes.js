const express = require("express");
const router = express.Router();

const { getRoom } = require("../controllers/roomControllers");
const {
  process_login,
  process_signup,
  process_logout,
} = require("../controllers/authControllers");
router.get("/:id", getRoom);
router.post("/:id/auth/login", process_login);
router.post("/:id/auth/signup", process_signup);
router.get("/:id/auth/logout", process_logout);
module.exports = router;
