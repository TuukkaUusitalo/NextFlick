import React, {useState, useEffect} from 'react'
import { FaRegStar } from "react-icons/fa";


export default function ReviewCard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    // Let's fetch movies for the user when searchTerm changes
    useEffect(() => {
        if (searchTerm.length < 2) {
          setMovies([]); // Tyhjennetään lista jos liian vähän kirjaimia
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
      }, [searchTerm]); // Uusi haku aina kun hakusana muuttuu
     // This fetches always again when search term changes

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
                    <div key={movie.id}>
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
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Recommendations</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>I'v Watched</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Watching For Next</button>
                </div>

                <div style={{width: '20%', marginTop: '1rem'}}>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Submit</button>
                </div>

            </div>
        </div>
    </div>
  )
}