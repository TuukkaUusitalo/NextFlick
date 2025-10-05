import './App.css';
import Nav from './Navigation'
import Hero from './Hero'
import Footer from './Footer.jsx'
import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './profile/Profile.jsx';
import SignupPage from './components/SignupPage.jsx';
import RecommendationsPage from './recommendations/Recommendations.jsx';
import ReviewsPage from './Reviews.jsx';
import TrendingPage from './TrendingMovies.jsx';
import TrendingMovies from './TrendingMovies.jsx';
import TrendingTvshows from './TrendingTvshows.jsx';


function Homepage({setIsAuthenticated}) {
  return(
  <div>
    <header>
      
      <Hero setIsAuthenticated={setIsAuthenticated}/>
      
    </header>
      <TrendingMovies/>
      <TrendingTvshows/>
</div>
  );
}

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem("isAuthenticated") === "true");


  return(
     <div className="App">
        <BrowserRouter>
        <div>
    <Nav isAuthenticated={isAuthenticated} style={{position:"sticky"}}/>
    <Routes>
      
      <Route path="/" element={<Homepage setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path="/Trending" element={<TrendingPage />} />
      <Route path="/Reviews" element={<ReviewsPage />} />
      <Route path="/Recommendations" element={<RecommendationsPage />} />
      <Route path="/Profile" element={<ProfilePage />} />
       <Route path="/signup"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/" />
                    ) : (
                      <SignupPage  />
                    )
                  }
                 />
   
    </Routes>
     <p>{'\u00A0'}</p> {/*Unicode non-breaking space*/}
    <p>{'\u00A0'}</p> {/*Unicode non-breaking space*/}

      <Footer/>
    </div>
  </BrowserRouter>
      </div>

)}

export default App;
