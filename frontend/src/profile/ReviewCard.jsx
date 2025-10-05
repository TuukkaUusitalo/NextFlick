import React, {useState, useEffect} from 'react'
import { FaRegStar } from "react-icons/fa";


export default function ReviewCard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [lists, setLists] = useState({
      preferences: false,
      watched: false,
      watchNext: false,
    });

    // Let's fetch movies for the user when searchTerm changes
    useEffect(() => {
        if (searchTerm.length < 2) {
          setMovies([]); // Clear movies if search term is too short
          return;
        }
    
        const fetchMovies = async () => {
            try {
              const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?&query=${searchTerm}`,
                {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`
                    }
                  }
              );

              const data = await response.json();
              setMovies(data.results || []);
            } catch (error) {
              console.error("Virhe haussa:", error);
            }
        };
          
        fetchMovies();
      }, [searchTerm]); // This fetches always again when search term changes

     const handleSubmit = async () => {
      if (!selectedMovie) {
        alert("Please select a movie first!");
        return;
      }
    
      const payload = {
        name: selectedMovie.title,
        movieId: selectedMovie.id,
      };
    
      const httpPath = import.meta.env.VITE_HTTP_PATH;
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
    
      try {
        // 1. Fetch current user data
        const userRes = await fetch(`${httpPath}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await userRes.json();
    
        // 2. Update the relevant lists
        if (lists.watched) {
          const updatedWatched = [...user.watchedMovies, payload];
          await fetch(`${httpPath}/users/watched/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ watchedMovies: updatedWatched }),
          });
        }
    
        if (lists.watchNext) {
          const updatedYetToWatch = [...user.yetToWatchMovies, payload];
          await fetch(`${httpPath}/users/yettowatch/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ yetToWatchMovies: updatedYetToWatch }),
          });
        }
    
        if (lists.preferences) {
          const updatedPreferences = [...user.preferencesMovies, payload];
          await fetch(`${httpPath}/users/preferences/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ preferencesMovies: updatedPreferences }),
          });
        }
    
        alert("Movie(s) saved successfully!");
      } catch (error) {
        console.error("Error submitting movie:", error);
      }
    };
    
    
    

  return (
    <div style={{width: '100%', margin: 'auto', borderRadius: '2rem', backgroundColor: '#202020'}} >
        <div style={{width: '100%', height: '25rem', display: 'flex', padding: '1rem',}}>

            <div style={{ width: "30%", margin: "1rem" }}>
                <input
                    type="text"
                    placeholder="Movie Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                    width: "95%",
                    height: "2rem",
                    borderRadius: "1rem",
                    border: "none",
                    paddingLeft: "0.5rem"
                    }}
                />
                <div style={{ marginTop: "0.5rem", height: "22rem", width: "auto", overflowY: "auto" }}>
                    {searchTerm.length >= 2 && movies.length === 0 && <p>No movies found</p>}
                    {movies.map((movie) => (
                  <div 
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    style={{
                      cursor: "pointer",
                      border: selectedMovie?.id === movie.id ? "2px solid #FF5733" : "none",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "0.5rem"
                    }}
                  >
                    <h3>{movie.title}</h3>
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                      />
                    )}
                  </div>
                ))}
                </div>
            </div>

            <div style={{width: '50%', margin: '1rem'}}>
                <textarea placeholder='Write review...' style={{width: '100%', height: '8rem', borderRadius: '1rem', padding: '0.5rem', border: 'none', marginBottom: '0.5rem'}} />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />

                <p style={{fontSize: '20px', fontWeight: 'bold'}}>Add to</p>
                <div style={{display: 'flex'}}>
                  <button
                    onClick={() => setLists({ ...lists, recommendations: !lists.recommendations })}
                    style={{

                      backgroundColor: lists.recommendations ? "#FF5000" : "#202020",
                      border: "0.2px solid #f36502",
                      borderRadius: "10px",
                      padding: "0.7rem",
                      color: "white",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
                      fontWeight: "bold",
                      hover: "box-shadow: 0 0 16px  #FF5000",
                    }}
                  >
                    Recommendations
                  </button>
                  <button
                    onClick={() => setLists({ ...lists, watched: !lists.watched })}
                    style={{
                     
                      backgroundColor: lists.watched ? "#FF5000" : "#202020",
                      border: "0.2px solid #f36502",
                      borderRadius: "10px",
                      padding: "0.7rem",
                      color: "white",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
                      fontWeight: "bold",
                      hover: "box-shadow: 0 0 16px  #FF5000",
                    }}
                  >
                    I've Watched
                  </button>
                  <button
                    onClick={() => setLists({ ...lists, watchNext: !lists.watchNext })}
                    style={{

                      backgroundColor: lists.watchNext ? "#FF5000" : "#202020",
                      
                      border: "0.2px solid #f36502",
                      borderRadius: "10px",
                      padding: "0.7rem",
                      color: "white",
                      marginTop: "1rem",
                      marginLeft: "1rem",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
                      fontWeight: "bold",
                      hover: "box-shadow: 0 0 16px  #FF5000",
                    }}
                  >
                    Watching For Next
                  </button>
                </div>

                <div style={{width: '20%', marginTop: '1rem'}}>
                <div style={{ width: "20%", marginTop: "1rem" }}>
                  <button
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#202020",
                      border: "0.2px solid #f36502",
                      borderRadius: "10px",
                      padding: "0.7rem",
                      color: "white",
                      margin: "1rem",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
                      fontWeight: "bold",
                      hover: "box-shadow: 0 0 16px  #FF5000",
                    }}
                  >
                    Submit
                  </button>
                </div>

                </div>

            </div>
        </div>
    </div>
  )
}