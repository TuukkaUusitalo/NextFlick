import f1 from "../assets/movie-f1.jpg"
import shangchi from "../assets/movie-Shang-Chi.jpg"
import thewitch from "../assets/movie-TheWitch.jpg"
import './Watched.css';



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

function SmallCardForm(props){
    return(
        <div className="movieCardContainer">
            <div className="movieCard">
                <img src={movieChoice(props.name)} alt="Movie" />
                <div className="movieCardText">
                    {/* <h3>{props.name}</h3> */}
                    {/* Tähän tehdään sellainen review
                     eli käyttäjän arosana esim tähtinä */}
                    <p>Arvostelu</p>
                    <p>oransseina</p>
                    <p>tähtinä</p>
                </div>
            </div>
        </div>

    )

}

export default SmallCardForm