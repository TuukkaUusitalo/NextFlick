import React, {useState} from 'react';
import './FollowPage.css';
import OtherUserProfilePic from './OtherUserProfilePic';
import UserWatched from './UserWatched.jsx'


function FollowPage() {


    return (
        <div>

            <div  style={{display: 'flex', margin: 'auto'}}>

                <div className='modal-user-view'>
                    <div style={{display: 'flex'}}>
                        <div style={{width: '20%', justifyContent: 'center', display: 'flex'}}>
                            <OtherUserProfilePic />
                        </div>
                        <div>
                            <p style={{marginTop: '2rem', fontSize: '18px', margin: 'auto', marginLeft: '3rem', fontWeight: 'bold'}}>Firstname Recommends:</p>
                            <UserWatched />
                        </div>
                    </div>
                    <UserWatched />
                </div>

                <div>
                    {/* Here comes the list of users below when searching */}
                    <input placeholder="Search friends" style={{margin: '2rem', width: '100%', color: 'white', backgroundColor: '#202020', border: '0.2px solid white', borderRadius: '10px', padding: '0.5rem', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'}} />
                    <ul style={{width: '100%'}}>
                        <div style={{margin: 'auto', width: '100%', color: '#FFFAF0', padding: '0.5rem',  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'}}><img></img><p>Test user 1</p></div>
                        <div style={{margin: 'auto', width: '100%', color: '#FFFAF0', padding: '0.5rem',  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'}}><img></img><p> Test User 2</p></div>
                        <div style={{margin: 'auto', width: '100%', color: '#FFFAF0', padding: '0.5rem',  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'}}><img></img><p></p> Test user 3</div>
                        <div style={{margin: 'auto', width: '100%', color: '#FFFAF0', padding: '0.5rem',  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)'}}><img></img><p></p>test User 4</div>
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default FollowPage;