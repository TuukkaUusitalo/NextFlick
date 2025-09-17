import SmartMovies from './assets/SmartMovies.jpeg'
import MoviePoster from './assets/movie-poster1.jpg'
import LikeShare from './assets/LikeShare.jpeg'
import SignUp from './assets/SignUp.jpeg'
import SignupPage from "./components/SignupPage.jsx";
import SigninPage from "./components/SigninPage.jsx";
import './App.css'
import { useState } from "react";


const Hero = () => {
 const [showSignup, setShowSignup] = useState(false);
 const [showSignin, setShowSignin] = useState(false);
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
        <a>Try our AI</a>
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
          
        <a onClick={() => setShowSignup(true)}>Sign Up</a>
        <span style={{fontSize:"x-large", color:"#FF5000"}}> {'\u00A0'}/{'\u00A0'} </span>
        <a onClick={() => setShowSignin(true)}>Sign In</a>
        
        </div>

    </div>
    
    </div>
    </div>
    {showSignup && (

        <SignupPage
          onClose={() => setShowSignup(null)}
        />
      )}
    {showSignin &&(
      <SigninPage
          onClose={() => setShowSignin(null)}
        />
    )}
    </div>
</div>
</div>
  )
}

export default Hero

