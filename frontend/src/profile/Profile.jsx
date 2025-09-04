import '../App.css';
import plusIcon from '../assets/plusIcon.png';
import Recommendation from './Recommendation';
import './Profile.css';
import profile_placeholder from '../assets/profile_placeholder.png';


function ProfilePage(props){

    return(
        <>
            <div className='container'>
                <div className={"recommendationsSection"}>

                    <div style={{display: 'flex'}}>
                        <div style={{width: '60%'}}>
                            <h1 style={{textAlign: 'right',}}>My Recommendations</h1>
                        </div>
                        <div style={{ marginTop: 27, width: '30%'}}> 
                            <img src={plusIcon} alt="plusIcon" style={{width: "10%", height: 'auto', margin: 10, borderRadius: 5, textAlign: 'left'}} />
                        </div>
                        <div ztylw={{width: '30%'}}></div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div className='linearGradientLeft'></div>
                            <div style={{display: 'flex', scrollBehavior: 'smooth'}}>
                                <Recommendation name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                                <Recommendation name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                                <Recommendation name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                            </div>
                        <div className='linearGradientRight'></div>
                    </div>
                </div>
                        <div className={"profilePicAndText"}>
                            
                            <div>
                                <img src={profile_placeholder} className='profilePic'></img>
                            </div>

                            <div className='profileText'>
                                <p style={{fontSize: 25, fontWeight: 'bold'}}>User Name</p>
                                <text>
                                    Here is my portfolio. I like movies that has action, but also romantic movies are my type.
                                    I also like horror movies, but not too scary. My favorite movie is "Inception" because it has a great plot and amazing visual effects.
                                </text>
                            </div>

                        </div>
                    </div>
                
            
        </>
    )

}

export default ProfilePage