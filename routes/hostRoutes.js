const express = require("express");
// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const { get_hosthome } = require("../controllers/hostControllers");

router.get("/homes", get_hosthome);
module.exports = router;
