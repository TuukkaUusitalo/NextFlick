import './App.css';
import Nav from './Navigation.jsx'
import MoviePoster from './assets/movie-poster1.jpg'
import MovieCard from "./MovieCard"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './profile/Profile.jsx';
import RecommendationsPage from './recommendations/Recommendations.jsx';
import ReviewsPage from './Reviews.jsx';
import TrendingPage from './Trending.jsx';




function Homepage() {
  return(
  <div>
    <header>
      <h1>A social way to watch your favorite movies and series</h1>
    </header>
     <img src={MoviePoster} alt="MoviePoster"
    style={{width: "80%", marginLeft:"10%"}}></img>
        
    <h2>What to watch next?</h2>

    <MovieCard
      name="F1: The Movie"
      text="Similar to the last movie you watched."
    />
    <MovieCard
      name="Shang-Chi"
      text="Your friend “Alan” watched this movie and rated it 5/5."
    />
    <MovieCard
      name="The Witch"
      text="We recommend this movie for you based on what you like."
    />
    <p>{'\u00A0'}</p> {/*Unicode non-breaking space*/}



</div>
  );
}
function App(){
  return(
  <Router>
    <Nav />
    <Routes>
      
      <Route path="/" element={<Homepage />} />
      <Route path="/Trending" element={<TrendingPage />} />
      <Route path="/Reviews" element={<ReviewsPage />} />
      <Route path="/Recommendations" element={<RecommendationsPage />} />

      <Route path="/Profile" element={<ProfilePage />} />
    </Routes>
  
  </Router>
 

)}

export default App;
