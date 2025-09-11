const express = require("express");
const router = express.Router();
const {getPopularMovies} = require("../controllers/movieControllers");

// GET /movies/popular/:query
router.get("/popular", getPopularMovies);

module.exports = router;