function normalizeMovieList(list) {
  let movieList = list;

  // If the plan is still a JSON string, try parsing it
  if (typeof movieList === "string") {
    try {
      movieList = JSON.parse(movieList);
    } catch (err) {
      console.error("❌ Failed to parse movie list JSON:", err);
      return [];
    }
  }

  // Ensure the simplified schema with safe defaults
  return movieList.map((movie) => ({
    movie: movie.movie || "Unknown Movie",
    reason: movie.reason || "No reason provided",
    summary: movie.summary || "No summary available",
  }));
}

module.exports = { normalizeMovieList };