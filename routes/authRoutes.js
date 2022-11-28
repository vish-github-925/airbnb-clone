const express = require("express");
// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const {
  process_login,
  process_signup,
  process_logout,
} = require("../controllers/authControllers");

router.post("/login", process_login);
router.post("/signup", process_signup);
router.get("/logout", process_logout);
module.exports = router;
