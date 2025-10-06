import React, { useState, useEffect } from 'react';
import '../App.css';
import Recommendation from './Recommendation';
import './Profile.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import ReviewCard from './ReviewCard';

const MyRecommendation = () => {
  const [showReviewCard, setShowReviewCard] = useState(false);
  const [userRecommends, setUserRecommends] = useState([]);

  const httpPath = import.meta.env.VITE_HTTP_PATH;
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");


  const fetchRecommendsMovie = async () => {
    console.log(" fetchRecommendsMovie() called");
    try {
      const res = await fetch(`${httpPath}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error(" Backend response NOT OK:", res.statusText);
        return;
      }

      const user = await res.json();

      if (user?.recommendationsMovies?.length > 0) {

        const tmdbResponses = await Promise.all(
          user.recommendationsMovies.map(async (m, i) => {
            const tmdbRes = await fetch(
              `https://api.themoviedb.org/3/movie/${m.movieId}`,
              {
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
                },
              }
            );

            if (!tmdbRes.ok) {
              return null;
            }

            const movieData = await tmdbRes.json();
            return movieData;
          })
        );

        const filtered = tmdbResponses.filter(Boolean);

        setUserRecommends(filtered);
      } else {
        setUserRecommends([]);
      }
    } catch (err) {
      console.error(" Error fetching recommended movies:", err);
    }
  };

  useEffect(() => {
    fetchRecommendsMovie();
  }, [showReviewCard]);

  return (
    <div style={{ width: '70%', marginTop: '3rem' }}>
      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <h1 style={{ textAlign: 'center' }}>My Recommendations</h1>
        <FaRegPlusSquare
          className="plus-icon"
          onClick={() => {
            console.log(" Opening ReviewCard modal");
            setShowReviewCard(true);
          }}
        />
      </div>

      <div className="gradient-box">
        <div className="scroll-content">
          {userRecommends.length === 0 && (
            <p style={{ textAlign: 'center', color: 'gray' }}>No recommendations yet.</p>
          )}
          {userRecommends.map((movie) => {
            return (
              <Recommendation
                key={movie.id}
                name={movie.title}
                poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              />
            );
          })}
        </div>
      </div>

      {showReviewCard && (
        <div className="modal-overlay" onClick={() => {
          console.log(" Closing ReviewCard modal");
          setShowReviewCard(false);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewCard onClose={() => {
              console.log(" ReviewCard onClose triggered");
              setShowReviewCard(false);
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecommendation;
