
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import NextFlick from './assets/NextFlickLogo1.jpg';
import ProfilePic from './assets/Profile-pic1.jpg';










const Nav = () => {



    return(
        <div>
            <nav className="navbar">
                <div className="nav-left">
                <Link to ='/'>
                <img src={NextFlick} alt="Logo" 
                style={{width:"90px"}}></img>
                </Link>                    
                </div>
                    <div className="nav-right">
                    </div>
                <Link to = "/Reviews" className="Reviews">Reviews</Link>
                <Link to = "Trending" className="Trending">Trending</Link>
                <Link to = "Recommendations" className="Recommendations">Recommendations </Link>
                <Link to = "Signout" className="Reviews">Log Out</Link>


                <Link to ='/Profile'>
                    <img src={ProfilePic} alt ="ProfilePic"
                    style={{width:"30px", }}></img>
                </Link>
                    
            </nav>
        </div>
    );
}

export default Nav