import React from 'react'
import { FaRegStar } from "react-icons/fa";


export default function ReviewCard() {
    

  return (
    <div style={{width: '100%', margin: 'auto', borderRadius: '2rem', backgroundColor: '#202020'}} >
        <div style={{width: '100%', height: '25rem', display: 'flex', padding: '1rem',}}>

            <div style={{width: '30%', margin: '1rem'}}>
                <input type="text" placeholder='Movie Name' style={{width: '95%', height: '2rem', borderRadius: '1rem', border: 'none', paddingLeft: '0.5rem'}} />
                <div style={{marginTop: '0.5rem', height: '20rem', width: 'auto'}}>{/*Here comes the picture of the movie*/}</div>
            </div>

            <div style={{width: '50%', margin: '1rem'}}>
                <textarea placeholder='Write review...' style={{width: '100%', height: '8rem', borderRadius: '1rem', padding: '0.5rem', border: 'none', marginBottom: '0.5rem'}} />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />

                <p style={{fontSize: '20px'}}>Add to</p>
                <div style={{display: 'flex'}}>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Recommendations</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>I'v Watched</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Watching For Next</button>
                </div>

                <div style={{width: '20%', marginTop: '1rem'}}>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Submit</button>
                </div>

            </div>
        </div>
    </div>
  )
}