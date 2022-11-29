const express = require("express");

// Initialising express Router Object
const router = express.Router();

// requiring the controller functions from roomControllers
const { getRoom } = require("../controllers/roomControllers");

const {
  process_login,
  process_signup,
  process_logout,
} = require("../controllers/authControllers");

// full path: /rooms/:id
// desc: Getting the room of the "id" field from the database
router.get("/:id", getRoom);

// full path: /rooms/:id/auth/login
// desc: Processing the user login request from the rooms page with the "id" field, which helps in redirecting to the same "rooms" page instead of "/" homepage
router.post("/:id/auth/login", process_login);

// full path: /rooms/:id/auth/signup
// desc: Processing the user signup request from the rooms page with the "id" field, which helps in redirecting to the same "rooms" page instead of "/" homepage
router.post("/:id/auth/signup", process_signup);

// full path: /rooms/:id/auth/logout
// desc: Processing the user logout request from the rooms page with the "id" field, which helps in redirecting to the same "rooms" page instead of "/" homepage
router.get("/:id/auth/logout", process_logout);

module.exports = router;
