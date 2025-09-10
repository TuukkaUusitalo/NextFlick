import React from 'react'
import { FaRegStar } from "react-icons/fa";


export default function ReviewCard() {
    

  return (
    <div style={{width: '100%', margin: 'auto', borderRadius: '2rem', backgroundColor: '#202020'}} >
        <div style={{width: '100%', height: '25rem', display: 'flex', justifyContent: 'center', padding: '1rem'}}>

            <div style={{width: '40%', margin: '1rem'}}>
                <input type="text" placeholder='Movie Name' style={{width: '100%', height: '2rem', borderRadius: '1rem', border: 'none'}} />
                <div style={{height: 'auto', width: 'auto'}}>{/*Here comes the picture of the movie*/}</div>
            </div>

            <div style={{width: '40%', margin: '1rem'}}>
                <textarea placeholder='Write review...' style={{width: '100%', height: '8rem', borderRadius: '1rem', padding: '1rem', border: 'none', marginBottom: '0.5rem'}} />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />

                <div style={{display: 'flex'}}>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Recommend</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Watched</button>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>For next</button>
                </div>

                <div style={{width: '20%', marginTop: '3rem'}}>
                    <button style={{ height: '2.5rem', borderRadius: '1rem', backgroundColor: '#FF5733', color: 'white', border: 'none', marginTop: '1rem', marginLeft: '1rem'}}>Submit</button>
                </div>

            </div>
        </div>
    </div>
  )
}