const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true }, // Unique username
    email: { type: String, required: true }, // Unique email address
    password: { type: String, required: true }, // Hashed password
    profilePicture: { type: String }, // URL to profile picture 
    bio: { type: String }, // User biography
    recommendedMovies: [{type: Schema.Types.ObjectId, ref: 'Blog'}], //Array of blog that have author that is the user
    watchedMovies: [{
      name: String,
      movieId: Number,
    }], //Movies the user has watched
    yetToWatchMovies: [{
      name: String,
      movieId: Number,
    }], // Movies the user plan to watch
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);