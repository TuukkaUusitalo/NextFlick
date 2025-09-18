import React, {useState, useEffect} from 'react';
import './FollowPage.css';
import OtherUserProfilePic from './OtherUserProfilePic';
import UserWatched from './UserWatched.jsx';


function FollowPage() {  
    const [searchTerm, setSearchTerm] = useState(''); // user's input
    const [users, setUsers] = useState([]); // responses
  
    useEffect(() => {
      if (searchTerm.length < 3) {
        setUsers([]); // clear if too few marks
        return;
      }
  
      const fetchUsers = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?&query=${encodeURIComponent(searchTerm)}`,
            {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_HTTP_PATH}`
              }
            }
          );
  
          const data = await response.json();
          setUsers(data.results || []);
        } catch (error) {
          console.error("Virhe haussa:", error);
        }
      };
  
      // a little delay so that it doesn't search on every letter
      const delayDebounce = setTimeout(() => {
        fetchUsers();
      }, 300);
  
      return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
    <div>
      <div style={{ display: 'flex', margin: 'auto' }}>
        <div className='modal-user-view'>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '20%', justifyContent: 'center', display: 'flex' }}>
              <OtherUserProfilePic />
            </div>
            <div>
              <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '3rem', fontWeight: 'bold' }}>
                Recommends
              </p>
              <UserWatched />
            </div>
          </div>
            <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '2rem', fontWeight: 'bold' }}>
                Has Watched
            </p>
          <UserWatched />
        </div>

        <div>
          {/* Search bar */}
          <input
            placeholder="Search friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              margin: '2rem',
              width: '100%',
              color: 'white',
              backgroundColor: '#202020',
              border: '0.2px solid white',
              borderRadius: '10px',
              padding: '0.5rem',
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'
            }}
          />

          {/* Search results */}
          <ul style={{ width: '100%', listStyleType: 'none', padding: 0 }}>
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    margin: 'auto',
                    width: '100%',
                    color: '#FFFAF0',
                    padding: '0.5rem',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)',
                    marginBottom: '0.5rem',
                  }}
                >
                  <p>{user.title}</p>
                </li>
              ))
            ) : (
              searchTerm.length >= 3 && <p style={{ color: 'white' }}>No users found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
    );
}

export default FollowPage;