import f1 from "../assets/movie-f1.jpg"
import shangchi from "../assets/movie-Shang-Chi.jpg"
import thewitch from "../assets/movie-TheWitch.jpg"
import './UserWatched.css';



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

function SmallMovies(props){
    return(
        <div className="movieCardContainer">
            <div className="movieCard">
                <img src={movieChoice(props.name)} alt="Movie" />
                
            </div>
        </div>

    )

}

export default SmallMovies