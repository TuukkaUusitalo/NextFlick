import '../App.css';
import plusIcon from '../assets/plusIcon.png';
import Recommendation from './Recommendation';
import './Profile.css';


function ProfilePage(props){

    return(
        <>
            <div className={"recommendations"}>

                <div style={{display: 'flex'}}>
                    <h1 style={{textAlign: 'center', width: "98%"}}>My Recommendations</h1>
                        <div>
                            <img src={plusIcon} alt="plusIcon" style={{width: "2%", height: 'auto', margin: 10}} />
                        </div>
                </div>

                <Recommendation name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                
            </div>
            <div className={"profilePicBox"}>

            </div>
        </>
    )

}

export default ProfilePage