import SmartMovies from './assets/SmartMovies.jpeg'
import MoviePoster from './assets/movie-poster1.jpg'
import LikeShare from './assets/LikeShare.jpeg'
import SignUp from './assets/SignUp.jpeg'
import './App.css'

const Hero = () => {
  return (
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
        <a>See Reviews</a>

    </div>
    <div className='heroCardThree'>
        <img src={SignUp}></img>
        <p>Add movies to your collection and recommend to others</p>
        <a>Sign Up</a>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Hero

