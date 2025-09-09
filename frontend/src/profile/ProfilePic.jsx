import React from 'react'
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
            <p style={{fontSize: 25, fontWeight: 'bold', textAlign: 'center'}}>User Name</p>
            <text>
                Here is my portfolio. I like movies that has action, but also romantic movies are my type.
                I also like horror movies, but not too scary. My favorite movie is "Inception" because it has a great plot and amazing visual effects.
            </text>
        </div>
    </div>
  )
}

export default ProfilePic