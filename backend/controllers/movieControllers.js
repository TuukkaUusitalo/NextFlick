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
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve popular movies", error: error.message });
    }
};

module.exports = { getPopularMovies };