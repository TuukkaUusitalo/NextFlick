const mongoose = require('mongoose');
const User = require('./userModel');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: {
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
}, { timestamps: true });

reviewSchema.statics.postReview = async function({userId, movieId, body, rating}) {
  const user = await User.findById(userId);
  if (!user) {
    throw Error("User not found");
  }
  const review = await this.create({movie_id: movieId, body, rating, author: userId });
  await User.findByIdAndUpdate(userId, { $push: { reviewedMovies: review._id } });
  return review;
}

reviewSchema.set('toJSON', {
virtuals: true,
transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}
});

module.exports = mongoose.model('Review', reviewSchema);