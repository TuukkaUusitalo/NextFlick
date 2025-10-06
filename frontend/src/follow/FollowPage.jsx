import React, { useState, useEffect } from 'react';
import './FollowPage.css';
import OtherUserProfilePic from './OtherUserProfilePic';
import UserWatched from './UserWatched.jsx';
import UserRecommends from './UserRecommends.jsx';

function FollowPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);

  // Haku käyttäjille
  useEffect(() => {
    if (searchTerm.length < 3) {
      setUsers([]);
      return;
    }
    const httpPath = import.meta.env.VITE_HTTP_PATH;

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${httpPath}/users?username=${encodeURIComponent(searchTerm)}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        setUsers(data || []);
      } catch (error) {
        console.error("Virhe haussa:", error);
      }
    };

    const delayDebounce = setTimeout(fetchUsers, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Kun käyttäjä valitaan, haetaan kaikki sen tiedot
  const fetchMovieDetails = async (movies) => {
    if (!Array.isArray(movies)) {
      console.warn("⚠️ movies ei ole taulukko:", movies);
      return []; // Return empty array if movies is not an array
    }
  
    return Promise.all(
      movies.map(async (m) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${m.movieId}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}`,
            },
          }
        );
        return res.json();
      })
    );
  };
  
  
  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    try {
      const httpPath = import.meta.env.VITE_HTTP_PATH;
      const response = await fetch(`${httpPath}/users/${user._id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
  
      // Information about recommended and watched movies from TMDB
      const prefer = await fetchMovieDetails(data.recommendationsMovies || []);
      const watched = await fetchMovieDetails(data.watchedMovies || []);
  
      setSelectedUserData({
        ...data,
        recommendationsMovies: prefer,
        watchedMovies: watched,
      });
    } catch (err) {
      console.error("Virhe haettaessa käyttäjää:", err);
    }
  };
  

  return (
    <div>
      <div style={{ display: 'flex', margin: 'auto' }}>
        {/* Left side profileview and infos */}
        <div className='modal-user-view'>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30%', justifyContent: 'center', display: 'flex' }}>
            <OtherUserProfilePic selectedUserData={selectedUserData} />
            </div>
            <div style={{ width: '70%' }}>
              {selectedUserData ? (
                <>
                  <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '3rem', fontWeight: 'bold' }}>
                  {selectedUser.username} Prefers
                  </p>
                  <UserRecommends movies={selectedUserData.recommendationsMovies} />
                  <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '2rem', fontWeight: 'bold' }}>
                     Has Watched
                  </p>
                  <UserWatched movies={selectedUserData.watchedMovies} />
                </>
              ) : (
                <p style={{ color: 'gray', marginLeft: '2rem' }}>Select a user to view details</p>
              )}
            </div>
          </div>
        </div>

        {/* search bar and results */}
        <div style={{ flex: 1 }}>
          <input
            placeholder="Find friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              margin: '2rem',
              width: '70%',
              color: 'white',
              backgroundColor: '#202020',
              border: '0.2px solid white',
              borderRadius: '10px',
              padding: '0.5rem',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)',
            }}
          />

          {/* results */}
          <div
            style={{
              width: "100%",
              listStyleType: "none",
              padding: 0,
              overflowY: "auto",
              maxHeight: "250px",
            }}
          >
            {Array.isArray(users) && users.length > 0 ? (
              users
                .filter((user) => {
                  const normalize = (str) =>
                    str
                      .toLocaleLowerCase("fi")
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "");
                  return normalize(user.username).startsWith(normalize(searchTerm));
                })
                .map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleUserSelect(user)}
                    style={{
                      margin: "auto",
                      width: "70%",
                      color: "#FFFAF0",
                      padding: "0.7rem",
                      boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.5)",
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "0.5rem",
                      cursor: "pointer"
                    }}
                  >
                    <p style={{ margin: 0 }}>{user.username}</p>
                  </li>
                ))
            ) : (
              searchTerm.length >= 3 && <p style={{ color: "white" }}>No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowPage;
