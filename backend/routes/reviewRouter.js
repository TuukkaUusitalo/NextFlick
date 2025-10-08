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
const { requireAuth } = require("../middleware/requireAuth");
 
// GET /reviews
router.get("/", getAllReviews);

//GET /reviews/user/:userId
router.get("/user/:userId", getReviewsByUserId);

//GET /reviews/movie/:movieId
router.get("/movie/:movieId", getReviewsByMovieId);

// POST /reviews
router.post("/", requireAuth, createReview);

// GET /reviews/:reviewId
router.get("/:reviewId", getReviewById);

// PUT /reviews/:reviewId
router.put("/:reviewId", requireAuth, updateReview);

// DELETE /reviews/:reviewId
router.delete("/:reviewId", requireAuth, deleteReview);


module.exports = router;