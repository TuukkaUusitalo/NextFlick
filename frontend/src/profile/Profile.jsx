import '../App.css';
import './Profile.css';
import WatchForNext from './WatchForNext';
import Watched from './Watched';
import ProfilePic from './ProfilePic';
import MyRecommendation from './MyRecommendation';


function ProfilePage(){

    return(
        <>

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

        </>
    )

}

export default ProfilePage