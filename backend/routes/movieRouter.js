const express = require("express");
const router = express.Router();
const {getMoviesDatabase} = require("../controllers/movieControllers");

// GET /movies/:endpoint
router.get("/:endpoint", getMoviesDatabase);

module.exports = router;