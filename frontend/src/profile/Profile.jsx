import '../App.css';
import plusIcon from '../assets/plusIcon.png';
import Recommendation from './Recommendation';
import './Profile.css';


function ProfilePage(props){

    return(
        <>
            <div className={"recommendations"}>

                <div style={{display: 'flex'}}>
                    <h1 style={{textAlign: 'right', width: "98%"}}>My Recommendations</h1>
                    <div style={{textAlign: 'left', marginTop: 30}}> 
                        <img src={plusIcon} alt="plusIcon" style={{width: "15%", height: 'auto', margin: 10, borderRadius: 5}} />
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={{display: 'flex', scrollBehavior: 'smooth'}}>
                        <Recommendation name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                        <Recommendation name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                        <Recommendation name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                    </div>
                    <div className={"profilePicAndText"}>
                        
                        <div className='profilePic'>
                            <img src="../assets/profile_placeholder.png"></img>
                        </div>

                        <div>
                            <h1 style={{textAlign: 'center'}}>My Name</h1>
                            <text  style={{textAlign: 'center'}}>
                                Here is my portfolio. I like movies that has action, but also romantic movies are my type.
                            </text>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default ProfilePage