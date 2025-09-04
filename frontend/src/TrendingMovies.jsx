import React, { useEffect, useState } from 'react';



const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {

        {/*NOT SECURE*/}
        const response = await fetch(

          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTY0MmY0YjBmNzU5MjVhOGY1ODNmMTVmY2JlN2Y5MiIsIm5iZiI6MTc1Njk4Mjc2Ni42NDUsInN1YiI6IjY4Yjk2ZGVlYmExMjkzYjM5MjliYjMyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fkFegz8468h6zHApXeHZ0d1W_7X7JRnn2wxgvnyyOIE'
            }
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

  return (
    <div>
      <h1>Trending Movies</h1>
      {error && <p>Error: {error}</p>}
                      

          

    <div className="MovieCardContainer"> 

        {movies.map(movie => (
          <div key={movie.id } className="MovieCard" >
            <img className='trendingMovieimg'
            
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}>
                
              </img>
            <p className='trendingMovieName'>{movie.title} </p>
            
          </div>
             
        ))}
        </div>
      
 
    </div>
  );
};

export default TrendingMovies;