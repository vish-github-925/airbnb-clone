const express = require("express");
// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const {
  get_hosthome,
  get_setuphome,
  add_newhome,
} = require("../controllers/hostControllers");
const {
  process_login,
  process_logout,
  process_signup,
} = require("../controllers/authControllers");

router.get("/homes", get_hosthome);
router.get("/set-up-home", get_setuphome);
router.post("/add-home", add_newhome);
router.post("/auth/login", process_login);
router.post("/auth/signup", process_signup);
router.get("/auth/logout", process_logout);
module.exports = router;
