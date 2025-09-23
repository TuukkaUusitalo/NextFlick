const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  getReviewsByUserId,
  getReviewsByMovieId,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
 
// GET /reviews
router.get("/", getAllReviews);

//GET /reviews/user/:userId
router.get("/user/:userId", getReviewsByUserId);

//GET /reviews/movie/:movieId
router.get("/movie/:movieId", getReviewsByMovieId);

// POST /cars
router.post("/", createReview);

// GET /cars/:carId
router.get("/:reviewId", getReviewById);

// PUT /cars/:carId
router.put("/:reviewId", updateReview);

// DELETE /cars/:carId
router.delete("/:reviewId", deleteReview);

// Update car using PATCH 
// router.patch('/:carId', patchCar)

module.exports = router;