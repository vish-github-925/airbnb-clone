const express = require("express");
// Initialising express router Object
const router = express.Router();

// requiring the controller functions from authControllers
const { get_user, get_host, get_homepage } = require("../controllers/rootControllers");

router.get("/", get_homepage);
router.get("/user", get_user);
router.get("/host", get_host);
module.exports = router;
