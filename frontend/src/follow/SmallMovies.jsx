
import './UserWatched.css';





function SmallMovies({ poster, name, text }) {
    return (
      <div className="movieCardContainer">
        <div className="movieCard">
          <img src={poster} alt={name} />
          <div className="movieCardText">
            <h4>{name}</h4>
            {text && <p>{text}</p>}
          </div>
        </div>
      </div>
    );
  }
  

export default SmallMovies