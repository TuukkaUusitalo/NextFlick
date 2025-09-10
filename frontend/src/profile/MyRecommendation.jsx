import React from 'react'
import '../App.css';
import Recommendation from './Recommendation';
import './Profile.css';
import { FaRegPlusSquare } from 'react-icons/fa';
import { useState } from 'react'
import ReviewCard from './ReviewCard';


const MyRecommendation = () => {

    const [showReviewCard, setShowReviewCard] = useState(false);

    function handleAddMovie() {
      setShowReviewCard(true);
    }
  
    function handleCloseReviewCard() {
      setShowReviewCard(false);
    }
    
  return (
    <div style={{width: '70%', marginTop: '3rem'}}>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <h1 style={{textAlign: 'center'}}>My Recommendations</h1>
            <FaRegPlusSquare 
            className="plus-icon"
            onClick={handleAddMovie}
            />
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
        {/* MODAALI */}
        {showReviewCard && (
        <div className="modal-overlay" onClick={handleCloseReviewCard}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ReviewCard onClose={handleCloseReviewCard} />
        </div>
        </div>
        )}
    </div>
  )
}

export default MyRecommendation

