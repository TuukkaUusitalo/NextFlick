const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  movie_id: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);