const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");


const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { 
      type: String, 
      required: true,
      unique: true }, // Unique username
    email: { 
      type: String, 
      required: true,
      unique: true, }, // Unique email address
    password: { 
      type: String, 
      required: true }, // Hashed password
    profilePicture: {
      type: String,default:'profile_placeholder.png'
    }, // URL to profile picture 
    bio: { 
      type: String,
      default:"" }, // User biography
    reviewedMovies: [{
      type: Schema.Types.ObjectId, ref: 'Blog'
    }], //Array of blog that have author that is the user
    watchedMovies: [{
      name: {type: String},
      movieId: {type: Number},
      _id: false}], //Movies the user has watched
    yetToWatchMovies: [{
      name: {type: String},
      movieId: {type: Number},
      _id: false}], // Movies the user plan to watch
      recommendationsMovies: [{
        name: {type: String},
        movieId: {type: Number},
        _id: false}], // Movies the user plan to watch
    preferences: {
      genres: [String, {_id: false}], // Preferred movie genres
      movies: [String, {_id: false}], // Preferred movies
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function(username, email, password) {
  // Validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });
  if (emailExists || usernameExists) {
    throw Error("Email or Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashedPassword });
  return user;
}

userSchema.statics.login = async function(username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Incorrect username");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
}

module.exports = mongoose.model("User", userSchema);