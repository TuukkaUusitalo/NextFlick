const { generateMovieList } = require("../services/movieService");
const { normalizeMovieList } = require("../utils/normalizeMovieList");
const mongoose = require("mongoose");
const User = require("../models/userModel");
// Controller to handle movie recommendation requests
//movie and genre preference is saved with user profile
// promptInput is taken from user input in the request body
const generateList = async (req, res) => {
  try {
    const { userId } = req.params;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const usePreferences = req.body.usePreferences || false;
    const promptInput = req.body.prompt;
    let moviePreferences = null;
    let genrePreference = null;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (usePreferences) {
      moviePreferences = user.preferences.movies;
      genrePreference = user.preferences.genres;
    }
    console.log("Prompt input:", promptInput);
    console.log("User preferences:", moviePreferences, genrePreference);
    if (!moviePreferences && !promptInput && !genrePreference) {
      return res.status(400).json({ message: "At least one field is required" });
    }

    const rawResponse = await generateMovieList(moviePreferences,genrePreference, promptInput);

    // Try to extract JSON from markdown fences
    const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
    if (process.env.DEBUG_GEMINI === "true") {
      console.log(jsonString);
    }


    let parsedList;
    try {
      parsedList = JSON.parse(jsonString);
    } catch (err) {
      return res.status(500).json({ error: "Error parsing JSON response." });
    }

    const normalizedList = normalizeMovieList(parsedList);
    res.json(normalizedList);

  } catch (err) {
    console.error("Error in reccomendController:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}
//The recommend currently sometime provide the wrong ID compare to the movie title
// e.g. it provide the movie ID 497582 for "The Batman" instead of 414906
// This is because the Gemini model sometimes make mistakes in providing accurate IDs from the database
// A possible solution is to use the movie title to search the TMDB database to get the correct ID
// But this will require additional API calls and may slow down the response time
// For now, we will return the data as is and handle any discrepancies on the client side if needed

module.exports = {generateList};