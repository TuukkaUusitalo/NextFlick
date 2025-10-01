const headers = {
    accept: 'application/json',
    Authorization: ` Bearer ${process.env.MOVIE_API_KEY}`
};
const url=`${process.env.MOVIE_API_URL}/tv`;

//GET /shows/:endpoint
// redirect GET request to the database
// use reference: https://developers.themoviedb.org/3/reference/
const getShowsDatabase = async (req, res) => {
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
// const getPopularShows = async (req, res) => {
//     try {
//         const language = req.query.language || 'en-US';
//         const page = req.query.page || '1';
//         const response = await fetch(`${url}/tv/popular?language=${language}&page=${page}`, {
//             method: 'GET',
//             headers: headers
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to retrieve popular TV", error: error.message });
//     }
// };


module.exports = { getPopularShow };