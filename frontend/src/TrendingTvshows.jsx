import React, { useEffect, useState } from 'react';
import MoviePopup from './MoviePopup';


const TrendingTvshows = () => {
  const [tvshows, setTvshows] = useState([]);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  
    useEffect(() => {
      const fetchGenres = async () => {
        const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

        try {
          const response = await fetch(
            'https://api.themoviedb.org/3/genre/tv/list?language=en-US',
           
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
    const fetchTrendingTvshows = async () => {
      const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

      try {

        {/*NOT SECURE*/}
        const response = await fetch(

          'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${apiKey}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setTvshows(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrendingTvshows();
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
      <h1>Trending TV Shows</h1>
      {error && <p>Error: {error}</p>}
                      

          

    <div className="MovieCardContainer"> 

        {tvshows.map(tvshow => (
          <div key={tvshow.id } className="MovieCard" onClick={() => setSelectedMovie(tvshow)} >
            <img className='trendingMovieimg'
            
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}>
                
              </img>
            <p className='trendingMovieName'>{tvshow.name} </p>
            <p className='trendingMovieOverview'>{tvshow.overview}</p>
          <div className="genreContainer">
          <p className="trendingMovieGenres">{getGenreNames(tvshow.genre_ids)}</p>
          </div>
          </div>
             
        ))}
        </div>
         {selectedMovie && (
        <MoviePopup
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
        )}
 
    </div>
  );
};

export default TrendingTvshows;