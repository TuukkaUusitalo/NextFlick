import f1 from "../assets/movie-f1.jpg"
import shangchi from "../assets/movie-Shang-Chi.jpg"
import thewitch from "../assets/movie-TheWitch.jpg"
import './Profile.css';



function movieChoice(movie){
    if (movie === "F1: The Movie"){
        return f1
    }
     if (movie === "Shang-Chi"){
        return shangchi
    }
     if (movie === "The Witch"){
        return thewitch
    }
     if (movie === "F1"){
        return f1
    }
}

function Recommendation(props){
    return(
        <div style={{width: '50%'}}>
            <div className="movieCardContainerRecommendation">
                <div className="movieCardRecommendation">
                    <img src={movieChoice(props.name)} alt="Movie" style={{width:"100%"}}></img>
                    <h3 style={{color: '#f36502'}}>{props.name}</h3>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )

}

export default Recommendation