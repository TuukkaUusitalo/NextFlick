const headers = {
    accept: 'application/json',
    Authorization: ` Bearer ${process.env.MOVIE_API_KEY}`
};
const url= 'https://api.themoviedb.org/3';

//GET /movies/popular
const getPopularMovies = async (req, res) => {
    try {
        const language = req.query.language || 'en-US';
        const page = req.query.page || '1';
        const response = await fetch(`${url}/movie/popular?language=${language}&page=${page}`, {
            method: 'GET',
            headers: headers
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve popular movies", error: error.message });
    }
};

//GET /movies/genres
const getMovieGenres = async (req, res) => {
    try {
        const genres = await fetch(`${url}/genre/movie/list?language=en-US`, {
            method: 'GET',
            headers: headers}
        );
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve movie genres", error: error.message });
    }
};

//GET /movies/:movieId
const getMovieById = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await fetch(`${url}/movie/${movieId}?language=en-US`, {
            method: 'GET',
            headers: headers}
        );
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve movie", error: error.message });
    }
};
module.exports = { getPopularMovies, getMovieGenres, getMovieById };