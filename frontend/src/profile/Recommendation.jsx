
import './Profile.css';



function Recommendation({ name, poster }) {

    const shortName = name.length > 16 ? name.slice(0, 20) + "…" : name;

    return (
      <div className="movieCardContainerRecommendation">
        <div className="movieCardRecommendation">
          <img src={poster} alt={name} />
          <div className="movieCardText">
            <h3>{shortName}</h3>
          </div>
        </div>
      </div>
    );
  }
  

export default Recommendation