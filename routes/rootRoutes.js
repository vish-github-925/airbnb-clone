const express = require("express");

// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const { get_homepage } = require("../controllers/rootControllers");

// full path: /
// desc: Getting the homepage(landing page)
router.get("/", get_homepage);

module.exports = router;
