const express = require("express");
const router = express.Router();

const { getRoom } = require("../controllers/roomControllers");
router.get("/:id", getRoom);
module.exports = router;
