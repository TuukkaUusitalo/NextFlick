import React from "react";
import './UserWatched.css';
import SmallMovies from "./SmallMovies";

const UserWatched = ({ movies = [] }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p style={{ color: "gray" }}>No movies found</p>;
  }

  return (
    <div className="gradient-box2">
      <div className="scroll-content2">
        {movies.map((movie) => (
          <SmallMovies
            key={movie.id|| movie.movieId}
            name={movie.title}
            text={movie.overview}
            poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserWatched;
