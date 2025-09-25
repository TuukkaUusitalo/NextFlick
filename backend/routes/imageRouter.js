const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../middleware/customMiddleware");
const {getMovieImage,
    getProfileImage,
    newProfileImage,
} = require("../controllers/imageControllers");

//GET /image/movie/:size/:filePath
router.get("/movie/:size/:filePath", getMovieImage);

//GET /image/user/:filePath
router.get("/user/:userId", getProfileImage);

//POST /image/user/:userId
router.post("/user/:userId",uploadMiddleware, newProfileImage);

module.exports = router;