import f1 from"./assets/movie-f1.jpg"
import shangchi from "./assets/movie-Shang-Chi.jpg"
import thewitch from "./assets/movie-TheWitch.jpg"
import TrendingMovies from "./TrendingMovies"


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




const MovieCard = (props) => {
    return(
                
        <div>
            <TrendingMovies/>
            
            <div className="MovieCard">
                <img src={movieChoice(props.name)} alt="Movie" style={{width:"140px"}}></img>
                <h3>{props.name}</h3>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default MovieCard