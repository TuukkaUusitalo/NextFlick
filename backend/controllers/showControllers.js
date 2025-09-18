const headers = {
    accept: 'application/json',
    Authorization: ` Bearer ${process.env.MOVIE_API_KEY}`
};
const url= 'https://api.themoviedb.org/3';

//GET /show/popular
const getPopularShows = async (req, res) => {
    try {
        const language = req.query.language || 'en-US';
        const page = req.query.page || '1';
        const response = await fetch(`${url}/tv/popular?language=${language}&page=${page}`, {
            method: 'GET',
            headers: headers
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve popular TV", error: error.message });
    }
};


module.exports = { getPopularShow };