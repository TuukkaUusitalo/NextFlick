import '../App.css';
import './Profile.css';
import '../follow/FollowPage.css';
import WatchForNext from './WatchForNext';
import Watched from './Watched';
import ProfilePic from './ProfilePic';
import MyRecommendation from './MyRecommendation';
import FollowPage from '../follow/FollowPage'
import React, {useState} from 'react';


function ProfilePage() {

    const [userWindow, setUserWindow] = useState(false);

    function handleOpenFollowPage() {
        setUserWindow(true);
      }
    
      function handleCloseFollowPage() {
        setUserWindow(false);
      }

    return(
        <>
            <div style={{justifyContent: 'right', display: 'flex'}}>
                <button className="findFriendBtn" onClick={handleOpenFollowPage}>Find Friends</button>
            </div>
            <div style={{display: 'flex', width: '100%'}}>
                <MyRecommendation />
                <ProfilePic />
            </div>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{width: '50%'}}>
                    <Watched />
                </div>
                <div style={{width: '50%'}}>
                    <WatchForNext />
                </div>
            </div>
            {userWindow && (
                <div className='modal-overlay2' onClick={handleCloseFollowPage}>
                    <div className='modal-content2' onClick={(e) => e.stopPropagation()}>
                        <FollowPage onClose={handleCloseFollowPage} />
                    </div>
                </div>
            )}
        </>
    )

}

export default ProfilePage