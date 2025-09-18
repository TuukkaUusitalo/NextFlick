import React, { useState, useEffect } from 'react'
import '../App.css';
import './Profile.css';
import profile_placeholder from '../assets/profile_placeholder.png';

const ProfilePic = () => {
  return (
    <div className={"profilePicAndText"}>
                    
        <div>
            <img src={profile_placeholder} className='profilePic'></img>
        </div>

        <div className='profileText'>
            <p style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>username</p>
            <textarea placeholder="Bio" style={{display: 'block', margin: 'auto', width: '100%', color: 'white', backgroundColor: '#202020', border: '0.2px solid white', borderRadius: '10px', padding: '0.5rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)', height: '4rem'}} />
            
        </div>
    </div>
  )
}

export default ProfilePic