import { useState } from 'react'
import SmallCardForm from './SmallCardForm';
import { FaRegPlusSquare } from 'react-icons/fa';
import ReviewCard from './ReviewCard';
import './Profile.css';


const WatchForNext = () => {

    const [showReviewCard, setShowReviewCard] = useState(false);

    function handleAddMovie() {
      setShowReviewCard(true);
    }
  
    function handleCloseReviewCard() {
      setShowReviewCard(false);
    }
    
  return (
    <>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <h1 style={{textAlign: 'center'}}>I'd Like to Watch</h1>
            <FaRegPlusSquare
            className="plus-icon"
            onClick={handleAddMovie}
            />
        </div>
        <div>
            <div class="gradient-box">
                <div class="scroll-content">
                    <SmallCardForm name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallCardForm name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallCardForm name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                    <SmallCardForm name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallCardForm name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallCardForm name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                </div>
            </div>
            <div class="gradient-box">
                <div class="scroll-content">
                    <SmallCardForm name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallCardForm name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallCardForm name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                    <SmallCardForm name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallCardForm name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallCardForm name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
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
    </>
  )
}

export default WatchForNext;

