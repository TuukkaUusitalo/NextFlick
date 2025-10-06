import React from "react";
import './UserWatched.css';
import SmallMovies from "./SmallMovies";

const UserRecommends = ({ movies = [] }) => {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p style={{ color: "gray" }}>No movies found</p>;
  }

  // Poistetaan mahdolliset duplikaatit movieId:n perusteella
  const uniqueMovies = Array.from(new Map(movies.map(m => [m.movieId || m.id, m])).values());

  
  return (
    <div className="gradient-box2">
      <div className="scroll-content2">
        {uniqueMovies.map((movie, index) => (
          <SmallMovies
            key={`${movie.movieId || movie.id}-${index}`} // uniikki key
            name={movie.title}
            poster={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserRecommends;
