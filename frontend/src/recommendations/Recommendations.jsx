import '../App.css';
import { useState, useEffect } from 'react'

function RecommendationsPage(){
    const [userPrompt, setUserPrompt] = useState("")
    const [dataAi, setDataAi] = useState(null)
    const [moviesMap, setMoviesMap] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const userId = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const httpPath = import.meta.env.VITE_HTTP_PATH;

   



    const getAiRecommendation = async() => {
        setIsLoading(true);
        try{
            const response = await fetch(`${httpPath}/users/recommend/${userId}`,
                {method:"POST",
                      headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
                body: JSON.stringify({
                    usePreferences: "none",
                    prompt:userPrompt
                })
        })
          if(!response.ok){
            console.log("Fetch failed")
            setIsLoading(false);
            return
        }
        const data = await response.json()
        console.log("Success", data)
        setDataAi(data)
        }
        catch(error){
            console.log(error)
        } finally {
        setIsLoading(false); 
  }
        }

          // 🔹 When dataAi updates, fetch movie details for each recommended movie
  useEffect(() => {
    const fetchMoviesForRecommendations = async () => {
      if (!dataAi || dataAi.length === 0) return;

      const map = {};
      for (const rec of dataAi) {
        try {
          // Check if the AI returned a movie_id (preferred)
          // If not, search by title as a fallback
          let res;
          if (rec.movie_id) {
            res = await fetch(`https://api.themoviedb.org/3/movie/${rec.movie_id}`, {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            });
          } else if (rec.movie) {
            res = await fetch(
              `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(rec.movie)}`,
              {
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${apiKey}`,
                },
              }
            );
          } else continue;

          const data = await res.json();
          // If it's a search result, pick the first one
          map[rec.movie_id || rec.movie] = data.results ? data.results[0] : data;
        } catch (err) {
          console.error("TMDB fetch error:", err);
        }
      }
      console.log("🎬 Movie Map:", map);
      setMoviesMap(map);
    };

    fetchMoviesForRecommendations();
  }, [dataAi]);


    return(
        <div>

            <h1> Welcome to the Recommendations page</h1>
            <p style={{marginLeft: '6rem', fontSize: 20}}>AI-Based Movie Recommendations</p>

            <div className="recommendationsHeader">
            <textarea placeholder="Describe your favorite movies or list movie names..." onChange={(e)=>setUserPrompt(e.target.value)} style={{backgroundColor: '#202020', borderRadius: 10, padding: 15, color: 'white'}}></textarea>
            <button onClick={getAiRecommendation} style={{color: "white", fontSize: 15}}>Get AI recommendation</button>
            </div>
            {isLoading && (
                <div className="loaderContainer">
                <div className="spinner"></div>
                <p>Fetching your personalized recommendations...</p>
            </div>
            )}

            {dataAi?(
                <div>
                {dataAi.map((data)=>{
                      const movie = moviesMap[data.movie_id|| data.movie];

                    return(
                    <div>                    
                    <p className="recommendationMovieName"> {data.movie}</p>

                   <div className="recommendationCard" key={data.movie_id || data.movie || index}>
                    {movie?.poster_path && (
                      <img
                        className="recommendationImage"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={"Movie poster"}
                      />
                    )}
                    <p className="recommendationReason">{data.reason}</p>

                   </div>

                   </div>)
                }
                
                )}
                </div>
            ):(<p></p>)}
        
        </div>
    )

}

export default RecommendationsPage