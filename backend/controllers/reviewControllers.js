const { default: mongoose } = require("mongoose");
const Review = require("../models/reviewModel");

 // GET /reviews
 const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
 };

//GET /reviews/user/:userId
// get all reviews by a specific user
const getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const reviews = await Review.find({ user_id: userId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

//GET /reviews/movie/:movieId
const getReviewsByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await Review.find({ movie_id: movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews" });
  }
};

// GET /reviews/:reviewId
const getReviewById = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }
  try {
    const review = await Review.findById(reviewId);
    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } 
    catch (error) {
    res.status(500).json({ message: "Failed to retrieve review", error: error.message });
  }
};

// POST /reviews
const createReview = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const newReview = await Review.postReview({
      userId: req.body.userId,
      movieId: req.body.movieId,
      body: req.body.body,
      rating: req.body.rating
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: "Failed to create review", error: error.message });
  }
};


// PUT /reviews/:reviewId
const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }
  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { ...req.body },
      { new: true }
    );
    if (updatedReview) {
      res.status(200).json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update review" });
  }
};

// DELETE /reviews/:reviewId
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }
  try {
    const deletedReview = await Review.findOneAndDelete({ _id: reviewId });
    if (deletedReview) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByUserId,
  getReviewsByMovieId,
  createReview,
  updateReview,
  deleteReview
};