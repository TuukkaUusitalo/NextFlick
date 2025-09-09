import React from 'react'
import { FaRegStar } from "react-icons/fa";


export default function ReviewCard() {
    
/*
    const { onClose, movie } = props;
        if (!movie) return null; // safety check
      
        
        const [liked, setLiked] = useState(false);
      
      
        const toggleLike = () => {
          setLiked(!liked);
             
        };
*/

  return (
    <div style={{width: '100%', margin: 'auto', opacity: 0.5, backgroundColor: 'black'}} >
        <div style={{width: '50%', height: '17rem'}}>
            <p>ReviewCard</p>
            <FaRegStar />
            <div>
                
            </div>
        </div>
    </div>
  )
}