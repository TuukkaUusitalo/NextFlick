import React from "react";
import SmallCardForm from "./SmallCardForm";
import { FaRegPlusSquare } from 'react-icons/fa';

const Watched = () => {
  return (
    <>
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex',}}>
            <h1 style={{textAlign: 'center'}}>I'v Watched</h1>
            <FaRegPlusSquare 
            className="plus-icon"
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
        </div>
    </>
  )
}

export default Watched