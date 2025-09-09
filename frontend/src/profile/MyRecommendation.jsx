import React from 'react'
import '../App.css';
import Recommendation from './Recommendation';
import './Profile.css';


const MyRecommendation = () => {
  return (
    <div style={{width: '70%', marginTop: '5rem'}}>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <h1 style={{textAlign: 'center'}}>My Recommendations</h1>
        </div>
        <div class="gradient-box">
            <div class="scroll-content">
                <Recommendation name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                <Recommendation name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                <Recommendation name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                <Recommendation name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                <Recommendation name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                <Recommendation name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
            </div>
        </div>
    </div>
  )
}

export default MyRecommendation

