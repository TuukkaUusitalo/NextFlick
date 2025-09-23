const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); // Import jwt module
require("dotenv").config();

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "6h" });
}

// GET /users
const getAllUsers = async (req, res) => {
    try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};
//Normally get all users is not needed, so comment it out in the final version

 
// POST /users
// User signing up
const createUser = async (req, res) => {
    try {
      const findUser = await User.findOne({ username: req.body.usernameusername }) ||
        await User.findOne({ email: req.body.email });
      if (findUser) {
        return res.status(400).json({ message: "Username or Email already in use" });
      } //Check if username or email already in use
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    //generate hashed password before storing to db
    const newUser = await User.create({ ...req.body });
    const user = {
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
      profilePicture: newUser.profilePicture,
      bio: newUser.bio,
      recommendMovies: newUser.recommendedMovies,
      watchedMovies: newUser.watchedMovies,
      yetToWatchMovies: newUser.yetToWatchMovies,
      preferences: newUser.preferences,
    };
    const token = createToken(newUser._id); // Create a token for the new user
    res.status(201).json({message: "User created",user: user, token:token});
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error: error.message });
  }
};

//POST /users/login
//User logging in
 const loginUser = async (req, res) => {
   try {
     const foundUser = await User.findOne({ username:req.body.username });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
      //Username not found
    }
    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
      //Wrong password
    }
    const user = {
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser._id,
      profilePicture: foundUser.profilePicture,
      bio: foundUser.bio,
      recommendMovies: foundUser.recommendMovies,
      watchedMovies: foundUser.watchedMovies,
      yetToWatchMovies: foundUser.yetToWatchMovies,
      preferences: foundUser.preferences,
    };
    const token = createToken(foundUser._id); // Create a token for the logged-in user
    res.status(200).json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
 };

//GET /users/:userName
//For when user try to login
const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
    }
};

//PUT /users/watched/:userId
const addWatchedMovie = async (req, res) => {
    const { userId } = req.params;
    const { movieId, movieName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { watchedMovies: {name:movieName,movieId:movieId}}}, // Use $addToSet to avoid duplicates
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

//PUT /users/yettowatch/:userId
const addYetToWatchMovie = async (req, res) => {
    const { userId } = req.params;
    const { movieId, movieName } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
      const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { yetToWatchMovies: {name:movieName,movieId:movieId }}}, // Use $addToSet to avoid duplicates
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

//PUT /users/preferences/:userId
const updatePreferences = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { 
        "preferences.genres": req.body.genrePreferences,
        "preferences.movies": req.body.moviePreferences }},
      { new: true }
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
    try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
    } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  addWatchedMovie,
  addYetToWatchMovie,
  updatePreferences,
  deleteUser,
};
