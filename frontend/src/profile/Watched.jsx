import React, { useState, useEffect } from "react";
import SmallCardForm from "./SmallCardForm";
import { FaRegPlusSquare } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import './Watched.css';

const Watched = () => {

    const [showReviewCard, setShowReviewCard] = useState(false);
    const [watchedMovies, setWatchedMovies] = useState([]);

    const httpPath = import.meta.env.VITE_HTTP_PATH;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    
 useEffect(() => {
    const fetchWatched = async () => {
      try {
        const res = await fetch(`${httpPath}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await res.json();

        if (user?.watchedMovies?.length > 0) {
          // Haetaan tiedot TMDB:stä jokaiselle movieId:lle
          const tmdbResponses = await Promise.all(
            user.watchedMovies.map(async (m) => {
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
          setWatchedMovies(tmdbResponses);
        }
      } catch (err) {
        console.error("Error fetching watched movies:", err);
      }
    };

    fetchWatched();
  }, [showReviewCard]);


  return (
        <>
      <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
        <h1 style={{ textAlign: "center" }}>I've Watched</h1>
        <FaRegPlusSquare className="plus-icon" onClick={() => setShowReviewCard(true)} />
      </div>

      <div className="gradient-box">
        <div className="scroll-content">
          {watchedMovies.map((movie) => (
            <SmallCardForm
              key={movie.id}
              name={movie.title}
              text={movie.overview}
              poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            />
          ))}
        </div>
      </div>

      {showReviewCard && (
        <div className="modal-overlay" onClick={() => setShowReviewCard(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewCard onClose={() => setShowReviewCard(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Watched;