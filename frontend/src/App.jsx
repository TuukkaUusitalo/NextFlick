import './App.css';
import Nav from './Navigation'
import Hero from './Hero'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './profile/Profile.jsx';
import RecommendationsPage from './recommendations/Recommendations.jsx';
import ReviewsPage from './Reviews.jsx';
import TrendingPage from './TrendingMovies.jsx';
import TrendingMovies from './TrendingMovies.jsx';
import TrendingTvshows from './TrendingTvshows.jsx';
import SignupPage from './components/SignupPage.jsx'


function Homepage() {
  return(
  <div>
    <header>
      
      <Hero/>
    </header>
                    <TrendingMovies/>
                    <TrendingTvshows/>
    
    
    
    <p>{'\u00A0'}</p> {/*Unicode non-breaking space*/}
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
