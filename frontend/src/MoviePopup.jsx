
import { FaRegPlusSquare, FaRegComment, FaRegBookmark } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike} from 'react-icons/ai'
import { useState } from 'react';
import ReviewCard from './profile/ReviewCard';
import './profile/profile.css';



function MoviePopup({ movie, onClose }) {
  if (!movie) return null; // safety check

  
  const [liked, setLiked] = useState(false);
  const [showReviewCard, setShowReviewCard] = useState(false);



  const toggleLike = () => {
    setLiked(!liked);
       
  };


  return (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.72)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    onClick={onClose} // close when clicking background
  >
    
      {showReviewCard ? (
        // Show ReviewCard instead of popup
        <div style={{height:"200px", maxWidth:"600px"}}onClick={(e) => e.stopPropagation()}>
          <ReviewCard />
          <button onClick={() => setShowReviewCard(false)}
        style={{
          position:"absolute",
          float: "right",
          padding: "5px 10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >back</button>
        </div>
      ) : (
        // Normal popup content
        <>
    <div
      style={{
        background: "rgba(31, 31, 31, 1)",
        boxShadow: "0 0 8px black",
        padding: "20px",
        borderRadius: "10px",
        width: "30rem",
        height: "40rem",
        position: "relative"
      }}
      onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
    >
      
          <div>
            <h2>{movie.title}</h2>
          </div>

          <div style={{ display: "flex" }}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "12rem", marginLeft: "5%", borderRadius: '12px' }}
            />

            <div style={{ marginLeft: "5%", marginRight: "5%" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "medium",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "5%"
                }}
              >
                <p>Add to recommendations </p>
                <FaRegPlusSquare
                  size={30}
                  color="white"
                  onClick={() => setShowReviewCard(true)}
                  className='plus-icon'
                />
              </div>

              <div style={{ height: "150px" }}>
                <p style={{ margin: "0px", height: "31%", border: "solid grey", padding: "0.2rem", borderRadius: '12px', borderWidth: 0.2 }}>
                  review 1
                </p>
                <p style={{ margin: "0px", height: "31%", border: "solid grey", padding: "0.2rem", marginTop: '0.2rem', marginBottom: '0.2rem', borderRadius: '12px', borderWidth: 0.2}}>
                  review 2
                </p>
                <p style={{ margin: "0px", height: "31%", border: "solid grey", padding: "0.2rem", borderRadius: '12px', borderWidth: 0.2 }}>
                  review 3
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  border: "solid black",
                  gap: "5%",
                  alignItems: "center",
                  float: "right"
                }}
              >
                {liked ? (
                  <AiFillLike
                    size={20}
                    color="white"
                    cursor="pointer"
                    onClick={toggleLike}
                  />
                ) : (
                  <AiOutlineLike
                    size={20}
                    color="white"
                    cursor="pointer"
                    onClick={toggleLike}
                  />
                )}

                <FaRegComment size={20} color="white" />
                <FaRegBookmark size={18} color="white" />
              </div>
            </div>
          </div>

          <div
            style={{
              height: "170px",
              overflow: "hidden"
            }}
          >
            <p>{movie.overview}</p>
          </div>
{/*
          <div
            style={{
              border: "solid black",
              height: "40px",
              textAlign: "center"
            }}
          >
            Tags
          </div>
      */}

      <button
        onClick={onClose}
        style={{
          float: "right",
          backgroundColor: '#202020',
          border: '0.2px solid #f36502',
          borderRadius: '10px',
          padding: '0.7rem',
          color: 'white',
          margin: '1rem',
          boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.5)',
          fontWeight: 'bold',
        }}
      >
        Close
      </button>
    </div></>
      )}
  </div>
  );  
}
export default MoviePopup;