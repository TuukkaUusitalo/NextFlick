import { FaRegPlusSquare } from 'react-icons/fa';
import { useState, useEffect } from 'react'
const AddReview = ({onClose}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("")
  
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
     
         if (!reviewText) {
           alert("Please write a review!");
           return;
         }
     
         if (rating < 0 || rating > 5) {
           alert("Rating must be between 0 and 5!");
           return;
         }
     
         const payload = {
           author: localStorage.getItem("id"),
           movie_id: selectedMovie.id,
           body: reviewText,
           rating: rating,
         };
      
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to submit review:", errorData);
      alert("Failed to submit review.");
      return;
    }

    const data = await response.json();
    console.log("Review saved:", data);
    alert("Review saved successfully!");
  } catch (error) {
    console.error("Error submitting review:", error);
  }
};
      
   return (
    
      <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)", // dim background
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
    onClick={onClose} // clicking outside closes modal
  >
<div
  style={{
    width: "80%",
    maxWidth: "900px",
    height: "500px",
    backgroundColor: "#202020",
    borderRadius: "1rem",
    padding: "1rem",
    display: "flex",           // ⬅️ make children sit side by side
    gap: "1rem",               // ⬅️ spacing between left and right
    overflowY: "hidden",
  }}
  onClick={(e) => e.stopPropagation()}
>
      
            <div style={{ width: "40%", margin: "1rem" }}>
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
                      boxShadow: selectedMovie?.id === movie.id ? "0 0 16px  #FF5000" : "none",
                      hover: "box-shadow: 0 0 16px  #FF5000",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "0.7rem",
                      gap: '0.5rem',
                      margin: '0.5rem',
                    }}
                  >
                    <h3>{movie.title}</h3>
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={{borderRadius: '0.7rem', marginLeft: 'auto', marginRight: 'auto'}}
                      />
                    )}
                  </div>
                ))}
                </div>
            </div>
                
            <div style={{width: '50%', margin: '1rem'}}>
                <button
        onClick={onClose}
        style={{
          float: "right",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
                <p style={{fontSize: '20px', fontWeight: 'bold'}}>Add a Review:</p>
                <div style={{display: 'inline-block'}}>
                    <p>What you thought about the movie?</p>
                <textarea onChange={(e)=>setReviewText(e.target.value)}style={{width:"200px", height:"100px"}} placeholder="Write a review here..."/>
                <p>How many stars? </p>
                <input onChange={(e)=>setRating(e.target.value)} placeholder="0-5"   min={0} max={5} type="number"></input>
                  
       
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
export default AddReview
