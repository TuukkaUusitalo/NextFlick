import React, { useState, useEffect } from 'react'
import '../App.css';
import './Profile.css';
import profile_placeholder from '../assets/profile_placeholder.png';

const ProfilePic = () => {
  const [bio, setBio] = useState('');

  const handleSaveBio = async () => {
    try {
      const httpPath = import.meta.env.VITE_HTTP_PATH;
      const token = localStorage.getItem("token"); // jos käytät JWT:tä

      const response = await fetch(`${httpPath}/users/bio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // jos vaaditaan auth
        },
        body: JSON.stringify({ bio })
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      alert("Bio saved successfully!");
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };


  return (
    <div className={"profilePicAndText"}>
                    
        <div>
            <img src={profile_placeholder} className='profilePic'></img>
        </div>

        <div className='profileText'>
            <p style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>{localStorage.getItem('username')}</p>
            <textarea placeholder="Bio" style={{display: 'block', margin: 'auto', width: '100%', color: 'white', backgroundColor: '#202020', border: '0.2px solid white', borderRadius: '10px', padding: '0.5rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)', height: '4rem'}} />
            
        </div>
    </div>
  )
}

export default ProfilePic