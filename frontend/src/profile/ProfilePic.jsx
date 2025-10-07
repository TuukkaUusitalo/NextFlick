import React, { useState, useEffect } from 'react'
import '../App.css';
import './Profile.css';
import profile_placeholder from '../assets/profile_placeholder.png';

const ProfilePic = () => {
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveBio = async () => {
    try {
      setSaving(true);
      setSaved(false);

      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")

      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bio })
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      setSaving(false);
      setSaved(true);

      // Piilotetaan "Saved" 2 sekunnin kuluttua
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving bio:", error);
      setSaving(false);
    }
  };

  // Käytetään debouncea: tallennetaan 1s viiveen jälkeen
  useEffect(() => {
    if (bio === "") return; // ei lähetetä tyhjää heti

    const timer = setTimeout(() => {
      handleSaveBio();
    }, 1000);

    return () => clearTimeout(timer); // jos kirjoitetaan lisää, perutaan edellinen tallennus
  }, [bio]);
  

  const handleGetBio = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id")

      const response = await fetch(`/api/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      if (data.bio) {
        setBio(data.bio);
      }

    } catch (err) {
      console.error("Error fetching bio:", err);
    }
  };

  useEffect(() => {
    handleGetBio();
  }, []);

  return (
    <div className={"profilePicAndText"}>
                    
        <div>
            <img src={profile_placeholder} className='profilePic'></img>
        </div>

        <div className='profileText'>
            <p style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>{localStorage.getItem('username')}</p>
            <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} style={{display: 'block', margin: 'auto', width: '100%', color: 'white', backgroundColor: '#202020', border: '0.2px solid white', borderRadius: '10px', padding: '0.5rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)', height: '4rem'}} />
            {saving && <p style={{fontSize: 12, color: 'gray'}}>Saving...</p>}
            {saved && <p style={{fontSize: 12, color: 'lightgreen'}}>Saved</p>}
        </div>
    </div>
  )
}

export default ProfilePic