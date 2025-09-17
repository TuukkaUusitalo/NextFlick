import React from 'react';
import './FollowPage';
import profile_placeholder from '../assets/profile_placeholder.png';

const OtherUserProfilePic = () => {
  return (
    <div className='profile_pic_text'>
                    
        <div>
            <img src={profile_placeholder} className='profile_pic'></img>
        </div>

        <div className='profile_text'>
            <p style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>First Lastname</p>
            <button className='followBtn'>Follow</button>
        </div>
    </div>
  )
}

export default OtherUserProfilePic