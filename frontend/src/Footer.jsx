import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import './Footer.css'


const Footer = () => {

    return(
        <footer>
            <h2>NextFlick</h2>
           <div className="siteLinks">
          <h3 >Quick Links</h3>
          <ul >
            <li><a href="/" >Home</a></li>
            <li><a href="/profile" >Profile</a></li>
            <li><a href="/reviews" >Reviews</a></li>
            
            <li><a href="/trending" >Trending</a></li>
            <li><a href="/recommendations" >Recommendations</a></li>
          </ul>
        </div>
        <div className="services">
          <h3>Services</h3>
           <ul >
            <li><a href="/" >About us</a></li>
            <li><a href="/" >Contact us</a></li>
            
            <li><a href="/" >Terms of service</a></li>
            
            <li><a href="/" >Report an issue</a></li>
          </ul>
        </div>
          
          
          <div className="socialMedia">
            <h3>Follow us:</h3>
             <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={24} color="white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter size={24} color="white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={24} color="white" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube size={24} color="white" />
            </a>
            
             <p>© 2025 NextFlick. All rights reserved.</p>
             </div>
        </footer>
    )
}

export default Footer