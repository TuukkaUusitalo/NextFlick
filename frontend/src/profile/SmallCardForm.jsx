import './Watched.css';


function SmallCardForm({ name, text, poster }) {

  const shortName = name.length > 16 ? name.slice(0, 16) + "…" : name;

  return (
    <div className="movieCardContainer">
      <div className="movieCard">
        <img src={poster} alt={name} />
        <div className="movieCardText">
          <h4>{shortName}</h4>
        </div>
      </div>
    </div>
  );
}

export default SmallCardForm;
