import React, { useEffect, useState } from 'react';



const TrendingTvshows = () => {
  const [tvshows, setTvshows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingTvshows = async () => {
      try {

        {/*NOT SECURE*/}
        const response = await fetch(

          'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
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
        setTvshows(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrendingTvshows();
  }, []);

  return (
    <div>
      <h1>Trending TV Shows</h1>
      {error && <p>Error: {error}</p>}
                      

          

    <div className="MovieCardContainer"> 

        {tvshows.map(tvshow => (
          <div key={tvshow.id } className="MovieCard" >
            <img className='trendingMovieimg'
            
              src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}>
                
              </img>
            <p className='trendingMovieName'>{tvshow.name} </p>
            <p className='trendingMovieOverview'>{tvshow.overview}</p>
          </div>
             
        ))}
        </div>
      
 
    </div>
  );
};

export default TrendingTvshows;