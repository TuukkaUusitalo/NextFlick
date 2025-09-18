const { generateMovieList } = require("../services/movieService");
const { normalizeMovieList } = require("../utils/normalizeMovieList");
// Controller to handle movie recommendation requests
//movie and genre preference is saved with user profile
// promptInput is taken from user input in the request body
const generateList = async (req, res) => {
  try {
    const {moviePreferences,genrePreference, promptInput} = req.body;

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

module.exports = {generateList};