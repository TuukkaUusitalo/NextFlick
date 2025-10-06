import './App.css';
import Nav from './Navigation'
import Hero from './Hero'
import Footer from './Footer.jsx'
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './profile/Profile.jsx';
import SignupPage from './components/SignupPage.jsx';
import SigninPage from './components/SigninPage.jsx';
import RecommendationsPage from './recommendations/Recommendations.jsx';
import ReviewsPage from './Reviews.jsx';
import TrendingPage from './TrendingMovies.jsx';
import TrendingMovies from './TrendingMovies.jsx';
import TrendingTvshows from './TrendingTvshows.jsx';
import SignoutPage from './components/SignoutPage.jsx';

function Homepage() {
  return (
    <div>
      <header>
        <Hero />
      </header>
      <TrendingMovies />
      <TrendingTvshows />
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isAuthenticated={isAuthenticated} style={{ position: "sticky" }} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/signout" element={<SignoutPage />} />

          {/* Recommendations page */}
          <Route path="/recommendations" element={<RecommendationsPage />} />

          {/* Profile page */}
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <ProfilePage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* Signup page */}
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <SignupPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {/* Login page */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <SigninPage setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
        </Routes>

        <p>{'\u00A0'}</p>
        <p>{'\u00A0'}</p>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
