const express = require("express");
const router = express.Router();

const { getBookingPage } = require("../controllers/bookControllers");

// path: /book/:id
// desc: Getting the booking page for the room of provided "id" field room data
router.post("/:id", getBookingPage);

module.exports = router;
