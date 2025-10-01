const model = require("../config/gemini"); 

async function generateMovieList(moviePreferences,genrePreference, promptInput) {
if (!moviePreferences && !promptInput && !genrePreference) {
    throw new Error("At least one input (moviePreferences, watchedMovies, or promptInput) is required");
  }
  const prompt = `
    You are a movie expert. Based on the user's movie preferences, watched movie or input prompt, generate a **movie list to watch** in **JSON format**.

    ### Schema Requirements:
    The JSON response should have the following structure:

    [{
      "movieId": "movie id from https://api.themoviedb.org/3"
      "movie": "movie titles or IDs",
      "reason": "short description of why these movies were chosen",
      "summary": "short summary of the movie list"
    },
    {
      "movieId": "movie id from https://api.themoviedb.org/3"
      "movie": "movie titles or IDs",
      "reason": "short description of why these movies were chosen",
      "summary": "short summary of the movie list"}
    ,...]

    ### User Input:
    The movies I like are: **${moviePreferences || "None"}**.
    My genre preferences are: **${genrePreference || "None"}**.
    Additional input: **${promptInput || "None"}**.
    Generate a movie list for me to watch based on this information.

    ### Instructions:
    - Provide at least 5 movie recommendations.
    - Recomend new movies that I haven't watched yet.
    - Do not have repeat movies from the provided moviePreferences.
    - Keep each field concise (1–3 sentences max).
    - Do not include extra fields outside of the schema.
    - Return only valid JSON.
  `;

  try {
    const result = await model(prompt);

    if (process.env.DEBUG_GEMINI === "true") {
      console.log("🔍 Raw Gemini response:", result);
    }

    return result.text;
  } catch (err) {
    console.error("Error in fitnessService:", err);
    throw new Error("Failed to generate movie list");
  }
}

module.exports = { generateMovieList };