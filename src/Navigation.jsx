
import { Link } from 'react-router-dom';
import NextFlick from './assets/NextFlickLogo1.jpg';
import ProfilePic from './assets/Profile-pic1.jpg';
import NotificationBell from './assets/Notification-pic1.jpg';


const ProfilePicture = () => {
    const handleClick = () =>{

    }

}


const Nav = (props) => {
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
                    <Link to ='/Profile'>
                    <img src={ProfilePic} alt ="ProfilePic"
                    style={{width:"30px", }}></img>
                    </Link>
                    
                <a>
                    <img src={NotificationBell} alt ="Notifications"
                    style={{width:"30px"}}></img>
                </a>
                
                <a>Reviews</a>
                <a>Trending</a>
                <a>Recommendations</a>
            </div>
            </nav>
        </div>
    );
}

export default Nav