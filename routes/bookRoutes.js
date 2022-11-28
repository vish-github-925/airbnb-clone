const express = require("express");
const router = express.Router();

const { getBookingPage } = require("../controllers/bookControllers");

router.post("/:id", getBookingPage);
module.exports = router;
