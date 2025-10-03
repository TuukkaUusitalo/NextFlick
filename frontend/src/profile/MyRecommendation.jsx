import React, {useState, useEffect} from 'react'
import '../App.css';
import Recommendation from './Recommendation';
import './Profile.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import ReviewCard from './ReviewCard';


const MyRecommendation = () => {

    function handleAddMovie() {
      setShowReviewCard(true);
    }
  
    function handleCloseReviewCard() {
      setShowReviewCard(false);
    }

    const [showReviewCard, setShowReviewCard] = useState(false);
    const [preferencedMovies, setPreferencedMovies] = useState([]);

    const httpPath = import.meta.env.VITE_HTTP_PATH;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    
 useEffect(() => {
    const fetchPreferenced = async () => {
      try {
        const res = await fetch(`${httpPath}/users/preferences/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await res.json();

        if (user?.preferencedMovies?.length > 0) {
          // Fetch details from TMDB for each movieId
          const tmdbResponses = await Promise.all(
            user.preferencedMovies.map(async (m) => {
              const tmdbRes = await fetch(
                `https://api.themoviedb.org/3/movie/${m.movieId}`,
                {
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                  },
                }
              );
              return tmdbRes.json();
            })
          );
          setPreferencedMovies(tmdbResponses);
        }
      } catch (err) {
        console.error("Error fetching recommended movies:", err);
      }
    };

    fetchPreferenced();
  }, [showReviewCard]);

  return (
    <div style={{width: '70%', marginTop: '3rem'}}>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <h1 style={{textAlign: 'center'}}>My Recommendations</h1>
            <FaRegPlusSquare 
            className="plus-icon"
            onClick={handleAddMovie}
            />
        </div>

        <div className="gradient-box">
        <div className="scroll-content">
          {preferencedMovies.map((movie) => (
            <Recommendation
              key={movie.id}
              name={movie.title}
              text={movie.overview}
              poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            />
          ))}
        </div>
      </div>

        {/* MODAL */}
        {showReviewCard && (
        <div className="modal-overlay" onClick={handleCloseReviewCard}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewCard onClose={handleCloseReviewCard} />
        </div>
        </div>
        )}
    </div>
  )
}

export default MyRecommendation

