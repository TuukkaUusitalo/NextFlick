import React from 'react';
import FollowPage from './FollowPage';
import profile_placeholder from '../assets/profile_placeholder.png';

const OtherUserProfilePic = ({ selectedUserData }) => {
  return (
    <div className='profile_pic_text'>
      <div>
        <img src={profile_placeholder} className='profile_pic' alt="Profile" />
      </div>

      <div className='profile_text'>
        <p style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
          {selectedUserData ? selectedUserData.username : "username"}
        </p>
        <button className='followBtn'>Follow</button>
        <h4>Bio</h4>
        <p style={{ width: 'auto' }}>
          {selectedUserData ? selectedUserData.bio || "No bio yet" : ""}
        </p>
        <p>Movies watched in total: {selectedUserData?.watchedMovies?.length || 0}</p>
      </div>
    </div>
  );
};

export default OtherUserProfilePic