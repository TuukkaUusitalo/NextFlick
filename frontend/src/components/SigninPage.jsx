import React, {useState} from 'react'
import './SignupPage.css'
import { useNavigate } from 'react-router-dom';



function SigninPage({setIsAuthenticated, onClose}) {
  const [username, setUsername] = useState("");
  const [passw, setPassW] = useState("")
  const navigate = useNavigate();

const loginUser = async(e) =>{
   e.preventDefault();
  try {
    const response = await fetch('/api/users/login', {
      method: "POST",
      headers: {
    "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: passw,
      })
    });

    if (!response.ok) {
      console.log('Fetch failed in creating user');
      const rsp = await response.json();
      console.log('Response:', rsp);
    } else {
      const data = await response.json();
      console.log('User created:', data);
      setIsAuthenticated(true);
      localStorage.setItem('username', data.username || username);
      localStorage.setItem('token', data.token);
      localStorage.setItem("user", JSON.stringify(data))
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user._id);
      localStorage.setItem("loginStatus", "true");
      console.log("local sotrage, username:", localStorage.getItem('username'));
      console.log("token", localStorage.getItem('token'));
      console.log("userId", localStorage.getItem('id'))

      navigate("/"); // To the home page after signup
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };


  const handleClose = () => {
    navigate("/"); // To the home page
  };


  
  return (
  <div className="overlay" onClick={onClose}>

    <div className='signinContainer' onClick={(e) => e.stopPropagation()} >
      <form onSubmit={loginUser} >
      <h3 >Sign in</h3>

    <p>Username</p>
      <input className='usernameInput' 
      placeholder='--Username here--' 
      onChange={(e) => setUsername(e.target.value)}
      value={username}>
      </input>
      
      <p>Password</p>
      <input type='password'className='passwordInput' placeholder='--Password here--'
      onChange={(e) => setPassW(e.target.value)}
      value={passw}>
      </input>
      
    <button className='signUpButton' type="submit">Sign in</button>
    <button className="closeButton" onClick={handleClose} >Close</button>
    </form>
    </div>

    </div>
  )
}

export default SigninPage