import './App.css';
import { useState, useEffect } from "react";
import  useAllReviews  from "../hooks/useAllReviews"

function ReviewsPage(){
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [selectedMovieId, setSelectedMovieId] = useState("");//Tracks selected movie
    const [userReviews, setUserReviews] = useState([])
    const [showUserReviews ,setShowUserReviews] = useState(false)
    const [userNames, setUserNames] = useState({})
    const [moviesMap, setMoviesMap] = useState({});

    const { getReviews, reviewsError } = useAllReviews()
                



useEffect(() => {
  const fetchMoviesForReviews = async () => {
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const map = {};
    for (const review of userReviews) {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${review.movie_id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const data = await res.json();
        map[review.movie_id] = data;
      } catch (err) {
        console.error(err);
      }
    }
    setMoviesMap(map);
  };

  if (userReviews.length > 0) fetchMoviesForReviews();
}, [userReviews]);

    
    useEffect(() =>{
        const fetchReviews = async() => {
        const reviews = await getReviews()
        console.log((reviews))
        setUserReviews((reviews))
        setShowUserReviews(true)
        }
        fetchReviews();
    },[])

    useEffect(() => {
  const fetchUsernames = async () => {
    const names = {};
    for (const review of userReviews) {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${review.author}`);
        const data = await response.json();
        names[review.author] = data.username; // assuming backend returns { username: "..." }
      } catch (err) {
        console.error(err);
      }
    }
    setUserNames(names);
  };

  if (userReviews.length > 0) {
    fetchUsernames();
  }
}, [userReviews]);


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
            <h2> User Reviews:</h2>
        {showUserReviews ? (
      <div>
        {userReviews.map((userReview) => {
  // find the movie object that matches this review
  const movie = moviesMap[userReview.movie_id];

  return (
    <div className="reviewCard" key={userReview._id}>
      <div className='reviewHeader'>
      <p className="reviewMovieAuthor">{userNames[userReview.author] || "Loading..."}</p>
      <p className="reviewMovieTitle">{movie?.title || "Unknown Movie"}</p>
      <p className="userReviewRating">{userReview.rating}/5</p>
      </div>
      {movie?.poster_path && (
        <img
          className="reviewMovieImage"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={"Movie poster"}
        />
      )}
      <p className="reviewMoviecontent">{userReview.body}</p>
    </div>
  );
})}

        </div>
      ) : (
        <p>Not found</p>
      )}
            

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