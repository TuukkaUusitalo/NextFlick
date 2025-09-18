import React, {useState, useEffect} from 'react';
import './FollowPage.css';
import OtherUserProfilePic from './OtherUserProfilePic';
import UserWatched from './UserWatched.jsx';


function FollowPage() {  
    const [searchTerm, setSearchTerm] = useState(''); // user's input
    const [users, setUsers] = useState([]); // responses
    //const [selectUser, setSelectUser] = useState(''); // Here comes the part where user from the list is selected and rendered to profile
  
    useEffect(() => {
      if (searchTerm.length < 3) {
        setUsers([]); // clear if too few marks
        return;
      }
      const httpPath = import.meta.env.VITE_HTTP_PATH;

      const fetchUsers = async () => {
        try {
          const response = await fetch(`${httpPath}/users?username=${searchTerm}`, {
            method: 'GET',
            headers: {
              accept: 'application/json'
            }
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
      
          const data = await response.json();
          setUsers(data || []);
        } catch (error) {
          console.error("Virhe haussa:", error);
        }
      };
      
  
      // a little delay so that it doesn't search on every letter
      const delayDebounce = setTimeout(() => {
        fetchUsers();
      }, 500);
  
      return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    return (
        <div>
          <div style={{ display: 'flex', margin: 'auto' }}>
            {/* Vasemman puolen käyttäjän suositukset ja katsotut */}
            <div className='modal-user-view'>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '30%', justifyContent: 'center', display: 'flex' }}>
                  <OtherUserProfilePic />
                </div>
                <div style={{ width: '70%' }}>
                  <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '3rem', fontWeight: 'bold' }}>
                    Recommends
                  </p>
                  <UserWatched />
                  <p style={{ marginTop: '2rem', fontSize: '18px', marginLeft: '2rem', fontWeight: 'bold' }}>
                    Has Watched
                  </p>
                  <UserWatched />
                </div>
              </div>
            </div>
      
            {/* Oikean puolen hakukenttä ja tulokset */}
            <div style={{ flex: 1 }}>
              {/* Hakukenttä */}
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
      
              {/* Hakutulokset */}
              <div style={{ width: '100%', listStyleType: 'none', padding: 0, overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth', maxHeight: '250px',}}>
                {users.length > 0 ? (
                  users.map((user) => (
                    <li
                      key={user.username}
                      style={{
                        margin: 'auto',
                        width: '70%',
                        color: '#FFFAF0',
                        padding: '0.7rem',
                        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)',
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '0.5rem',
                      }}
                    >
                      {/* <img
                        src={user.profilePicture || '/default-profile.png'}
                        alt="profile"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '1rem' }}
                      /> */}
                      <p style={{ margin: 0 }}>{user.username}</p>
                    </li>
                  ))
                ) : (
                  searchTerm.length >= 3 && <p style={{ color: 'white' }}>No users found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default FollowPage;