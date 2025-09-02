import './App.css';
import plusIcon from './assets/plusIcon.png';
import f1 from"./assets/movie-f1.jpg"
import shangchi from "./assets/movie-Shang-Chi.jpg"
import thewitch from "./assets/movie-TheWitch.jpg"
import MovieCard from './MovieCard';

function recommendations(movie) {
    if (movie === "F1: The Movie") {
        return f1;
    }
    if (movie === "Shang-Chi") {
        return shangchi;
    }
    if (movie === "The Witch") {
        return thewitch;
    }
}


function ProfilePage(props){

    return(
        <>
            <div className={"recommendations"}>

                <div style={{display: 'flex'}}>
                    <h1 style={{textAlign: 'center', width: "98%"}}>My Recommendations</h1>
                        <div>
                            <img src={plusIcon} alt="plusIcon" style={{width: "2%", height: 'auto', margin: 10}} />
                        </div>
                </div>

                <div className="movieCardContainer">
                    <div className="movieCard">
                        <img src={recommendations(props.movie)} alt="Movie" style={{width: '20%'}}></img>
                        <h3>{props.name}</h3>
                        <p>{props.text}</p>
                    </div>
                </div>
                <MovieCard name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>

            </div>
            <div className={"profilePicBox"}>

            </div>
        </>
    )

}

export default ProfilePage