import './App.css';
import { useState, useEffect } from "react";


function ReviewsPage(){
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState("");//Tracks selected movie
    
    //fetch trending movies
    useEffect(() =>{
        const fetchMovies = async () => {
        const apiKey = import.meta.env.VITE_MOVIE_API_KEY;          
        try{
            const response = 
            await fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US",
                {
                    method:"GET",
                    headers:{
                        accept:"application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
        if (!response.ok) throw new Error("Failed to fetch movies");
        const data = await response.json();
        setMovies(data.results);
    }
    catch (err){
        setError(err.message)
        }
    }
    fetchMovies();
    },[]);

    //fetch reviews by movie id
    useEffect(()=>{
        if(!selectedMovieId) return; // don't run if movie not chosen
        const getReview = async(id) =>{
            const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
            
            try{
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
                {    
                    method: "GET",
                    headers:{
                        accept:"application/json",
                        Authorization:`Bearer ${apiKey}`,
                    },
                }
                );
                if (!response.ok) throw new Error("Failed to fetch reviews");
                const data = await response.json()
                setReviews(data.results)
            }
            catch(err){
                setError(err.message)
            }
        }
        getReview(selectedMovieId);
    },[selectedMovieId]); // <-- Depends on movies


    return(
        <div>
            <h1> Welcome to the Reviews page</h1>
            <h2>Movie Reviews:</h2>
            <p>Choose a Movie:</p>
             
             <select
        value={selectedMovieId}
        onChange={(e) => setSelectedMovieId(e.target.value)}
      >
        <option value="">-- Select a Movie --</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
        </select>


            {reviews.length > 0 && (
        <div>
          {reviews.map((review) => {
            const movie = movies.find((m) => m.id === parseInt(selectedMovieId));
            return (
              <div className="reviewCard" key={review.id}>
                <p className="reviewMovieAuthor">{review.author}</p>
                <h3 className="reviewMovieTitle">{movie?.title}</h3>
                {movie?.poster_path && (
                  <img
                    className="reviewMovieImage"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <p className="reviewMoviecontent">{review.content}</p>
              </div>
            );
          })}
        </div>
      )}

      {reviews.length === 0 && selectedMovieId && <p>No reviews found.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}


export default ReviewsPage