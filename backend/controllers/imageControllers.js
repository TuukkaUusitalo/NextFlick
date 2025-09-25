const movie_url = process.env.MOVIE_IMAGE_URL;
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/userModel");

//GET /image/movie/:size/:filePath
// redirect GET request to the movie image url
const getMovieImage = async (req, res) => {
    const size =req.params.size || 'original';
    const filePath = req.params.filePath;
    const query = `${size}/${filePath}`;
    try {
        const image = await fetch(`${movie_url}${query}`, {
            method: 'GET'}
        );
        if (!image.ok) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).redirect(image.url);
    } catch (error) {
        res.status(500).json({ message: "Failed to call", error: error.message });
    }};

//GET /image/user/:filePath
const getProfileImage = async (req, res) => {
    const filePath = `./assets/${req.params.filePath}`;
    const absolutePath = path.resolve(filePath);
    try {
        if (!absolutePath) {
            return res.status(404).json({ message: "Image not found" });
        }
            res.status(200).sendFile(absolutePath);
    } catch (error) {
        res.status(500).json({ message: "Failed to call", error: error.message });
    }
};

//POST /image/user/:userId
const newProfileImage = async (req, res) => {
    const {userId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { "profilePicture": req.file.filename },
            { new: true }
        );
        const filePath = req.file.filename;
        res.status(200).json({ filePath, updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
};

module.exports = { getMovieImage,
    getProfileImage,
    newProfileImage};