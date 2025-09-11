import React, { useEffect, useState } from 'react';
import MoviePopup from './MoviePopup.jsx'





const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
         
          {method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`
            }}
        );
        if (!response.ok) throw new Error('Failed to fetch genres');
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {

    const fetchTrendingMovies = async () => {
     
       const apiKey = import.meta.env.VITE_MOVIE_API_KEY;


      try {
        

        {/*NOT SECURE*/}
        const response = await fetch(

          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}` }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrendingMovies();
  }, []);


    const getGenreNames = (ids) => {
     return ids.map((id) => 
      { const genre = genres.find((g) => g.id === id);

    return genre ? (<span key={id} className="genreName">
      {genre.name}</span>
      ):null;
  });
  };


  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>Error: {error}</p>}
                      

          

    <div className="MovieCardContainer" > 

        {movies.map(movie => (
          <div key={movie.id } className="MovieCard" onClick={() => setSelectedMovie(movie)} >
            <img className='trendingMovieimg'
            
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}>
                
              </img>
            <p className='trendingMovieName'>{movie.title} </p>
          <p className='trendingMovieOverview'>{movie.overview}</p>
            
            <div className="genreContainer">

            <p className="trendingMovieGenres">{getGenreNames(movie.genre_ids)}</p>
          </div>

          </div>
             
        ))}
        </div>
       {/* Show popup if movie is selected */}
      {selectedMovie && (
        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
 
    </div>
  );
};

export default TrendingMovies;

