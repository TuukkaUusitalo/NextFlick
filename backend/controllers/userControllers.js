const User = require("../models/userModel");
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

 
// POST /users/signup
// User signing up
const createUser = async (req, res) => {
    try {
    const { username, email, password } = req.body;
    const newUser = await User.signup(username, email, password);

    const token = createToken(newUser._id); // Create a token for the new user
    res.status(201).json({message: "User created",user: newUser, token:token});
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error: error.message });
  }
};

//POST /users/login
//User logging in
 const loginUser = async (req, res) => {
   try {
     const { username, password } = req.body;
     const user = await User.login(username, password);

     if (user) {
      const token = createToken(user._id); // Create a token for the logged-in user
      res.status(200).json({ message: "Login successful", user: user, token: token });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  addWatchedMovie,
  addYetToWatchMovie,
  updatePreferences,
  deleteUser,
};
