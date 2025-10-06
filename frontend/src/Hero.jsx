import SmartMovies from './assets/SmartMovies.jpeg'
import MoviePoster from './assets/movie-poster1.jpg'
import LikeShare from './assets/LikeShare.jpeg'
import SignUp from './assets/SignUp.jpeg'
import { Link } from "react-router-dom";
import './App.css'


const Hero = () => {

  return (

<div  style={{ position: "relative" }}>

    <div>
    <div >
        <h2>A social way to watch your favorite movies and series</h2>
    <div style={{backgroundImage:`url(${MoviePoster})`,margin:"0 auto", height:"450px", maxWidth:"1400px",  justifyContent:"center"}}>
    <div className='heroCards'>
    <div className='heroCardOne'>
        <img src={SmartMovies}></img>
        <p>Get smart movie recommendations based on your taste.</p>
        <a href="./recommendations">Try our AI</a>
    </div>
    <div className='heroCardTwo'>
        <img src={LikeShare}></img>
        <p>Follow friends, see and write reviews.</p>
        <a href="./reviews">See Reviews</a>

    </div>
    <div className='heroCardThree'>
        <img src={SignUp}></img>
        <p>Add movies to your collection and recommend to others</p>
        <div className='signupsContainer'>
          
    <Link to="/signup">Sign up</Link>
    <span style={{fontSize:"x-large", color:"#FF5000"}}> {'\u00A0'}/{'\u00A0'} </span>
    <Link to="/login">Log in</Link>

        </div>

    </div>
    
    </div>
    </div>

    </div>
</div>
</div>
  )
}

export default Hero

