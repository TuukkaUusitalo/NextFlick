const express = require("express");
const router = express.Router();
const {getPopularMovies} = require("../controllers/movieControllers");
const {generateList} = require("../controllers/recommendControllers");

// GET /movies/popular/:query
router.get("/popular", getPopularMovies);

// POST /movies/recommend
router.post("/recommend", generateList);

module.exports = router;