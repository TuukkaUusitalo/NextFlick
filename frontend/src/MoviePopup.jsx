function MoviePopup({ movie, onClose }) {
  if (!movie) return null; // safety check

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.72)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClick={onClose} // close when clicking background
    >
      <div
        style={{
          background:"grey",
          padding: "20px",
          borderRadius: "8px",
          width: "30rem",
          height:"40rem",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>{movie.title}</h2>
<img 
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
  alt={movie.title} style={{width:"12rem", marginLeft:"5%"}}
/>        <p>{movie.overview}</p>
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MoviePopup;
