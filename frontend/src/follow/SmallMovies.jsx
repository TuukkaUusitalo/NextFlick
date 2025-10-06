
import './UserWatched.css';





function SmallMovies({ poster, name, text }) {

  const shortName = name.length > 16 ? name.slice(0, 16) + "…" : name;

    return (
      <div className="movieCardContainer">
        <div className="movieCard">
          <img src={poster} alt={name} />
          <div className="movieCardText">
            <h4>{shortName}</h4>
            {text && <p>{text}</p>}
          </div>
        </div>
      </div>
    );
  }
  

export default SmallMovies