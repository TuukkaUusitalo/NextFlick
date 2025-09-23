const headers = {
    accept: 'application/json',
    Authorization: ` Bearer ${process.env.MOVIE_API_KEY}`
};
const url= `${process.env.MOVIE_API_URL}/movie`;

// GET /movies/:endpoint
// redirect GET request to the database
// use reference: https://developers.themoviedb.org/3/reference/
const getMoviesDatabase = async (req, res) => {
    const { endpoint } = req.params;
    try {
        const response = await fetch(`${url}/${endpoint}`, {
            method: 'GET',
            headers: headers}
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Failed to call", error: error.message });
    }
};

module.exports = { getMoviesDatabase };

// //GET /movies/popular
// const getPopularMovies = async (req, res) => {
//     try {
//         const language = req.query.language || 'en-US';
//         const page = req.query.page || '1';
//         const response = await fetch(`${url}/movie/popular?language=${language}&page=${page}`, {
//             method: 'GET',
//             headers: headers
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve popular movies", error: error.message });
//     }
// };

// //GET /movies/genres
// const getMovieGenres = async (req, res) => {
//     try {
//         const genres = await fetch(`${url}/genre/movie/list?language=en-US`, {
//             method: 'GET',
//             headers: headers}
//         );
//         res.status(200).json(genres);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve movie genres", error: error.message });
//     }
// };

// //GET /movies/:movieId
// const getMovieById = async (req, res) => {
//     const { movieId } = req.params;
//     try {
//         const movie = await fetch(`${url}/movie/${movieId}?language=en-US`, {
//             method: 'GET',
//             headers: headers}
//         );
//         res.status(200).json(movie);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve movie", error: error.message });
//     }
// };

// //GET /movies/search?query=
// const searchMovies = async (req, res) => {
//     const { query } = req.query;
//     try {
//         const movies = await fetch(`${url}/search/movie?query=${query}&language=en-US&page=1&include_adult=false`, {
//             method: 'GET',
//             headers: headers}
//         );
//         res.status(200).json(movies);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to search movies", error: error.message });
//     }
// };

// //GET /movies/reviews?movieId=
//  const getMovieReviews = async (req, res) => {
//      const { movieId } = req.query;
//         try {
//             const reviews = await fetch(`${url}/movie/${movieId}/reviews?language=en-US&page=1`, {
//                 method: 'GET',
//                 headers: headers}
//             );
//             res.status(200).json(reviews);
//         } catch (error) {
//             res.status(500).json({ message: "Failed to retrieve movie reviews", error: error.message });
//         }
//     };
// module.exports = { getPopularMovies, getMovieGenres, getMovieById, searchMovies };