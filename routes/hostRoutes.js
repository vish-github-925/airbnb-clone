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

// requiring protectRoutes middleware
const { protectRoutes } = require("../middlewares/protectRoutes");

// full path: /host/homes
// desc: Getting the host homepage (host landing page)
router.get("/homes", get_hosthome);

// full path: /host/set-up-home
// desc: Adding the home to database by a host, here using the "protectRoutes" middleware to protect the route from un-Authorized users
router.get("/set-up-home", protectRoutes, get_setuphome);

// full path: /host/add-home
// desc: adds the home by host with form data as request body
router.post("/add-home", add_newhome);

// full path: /host/auth/login
// desc: processes the login request from the host page, which helps in redirecting to the same host page i.e "/host/homes" instead of "/" homepage
router.post("/auth/login", process_login);

// full path: /host/auth/signup
// desc: processes the signup request from the host page, which helps in redirecting to the same host page i.e "/host/homes" instead of "/" homepage
router.post("/auth/signup", process_signup);

// full path: /host/auth/logout
// desc: processes the logout request from the host page, which helps in redirecting to the same host page i.e "/host/homes" instead of "/" homepage
router.get("/auth/logout", process_logout);

module.exports = router;
