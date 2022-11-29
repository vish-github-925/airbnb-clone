const express = require("express");
// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const {
  process_login,
  process_signup,
  process_logout,
} = require("../controllers/authControllers");

// full path: /auth/login
// desc: processing user login request from user page
// full path: /host/auth/login
// desc: processing user login request from host page
router.post("/login", process_login);

// full path: /auth/signup
// desc: processing user signup request from user page
// full path: /host/auth/signup
// desc: processing user signup request from host page
router.post("/signup", process_signup);

// full path: /auth/logout
// desc: processing user logout request from user page
// full path: /host/auth/logout
// desc: processing user logout request from host page
router.get("/logout", process_logout);

module.exports = router;
