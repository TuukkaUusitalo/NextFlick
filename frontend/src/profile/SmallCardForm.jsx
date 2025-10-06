import './Watched.css';

function SmallCardForm({ name, text, poster }) {
  return (
    <div className="movieCardContainer">
      <div className="movieCard">
        <img src={poster} alt={name} />
        <div className="movieCardText">
          <h4>{name}</h4>
        </div>
      </div>
    </div>
  );
}

export default SmallCardForm;
