
import './Profile.css';



function Recommendation(name, text, poster){
    return(
        <div className="movieCardContainerRecommendation">
            <div className="movieCardRecommendation">
                <img src={poster} alt={name} />
                <div className="movieCardText">
                    <h3>{name}</h3>
                </div>
            </div>
        </div>

    )

}

export default Recommendation