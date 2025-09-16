import React from "react";
import './UserWatched.css';
import SmallMovies from "./SmallMovies";

const UserWatched = () => {

    
  return (
    <>
        
        <div>
            <div class="gradient-box2">
                <div class="scroll-content2">
                    <SmallMovies name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallMovies name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallMovies name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                    <SmallMovies name="F1: The Movie" text="Amazing cinematography and thrilling racing scenes!" movie="F1: The Movie"/>
                    <SmallMovies name="Shang-Chi" text="Great movie, would recommend!" movie="Shang-Chi"/>
                    <SmallMovies name="The Witch" text="Spooky and atmospheric, a must-watch for horror fans." movie="The Witch"/>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserWatched