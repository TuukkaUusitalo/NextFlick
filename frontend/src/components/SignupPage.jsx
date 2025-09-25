import React, {useState} from 'react'
import './SignupPage.css'




function SignupPage({onClose}) {
  const [email, setEmail]=useState("");
  const [username, setUsername]=useState("");

  const [isValid, setIsValid] = useState(null);
  const [passw, setPassW] = useState("")
  const [isStrong, setIsStrong] = useState(false)

const createUser = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/users', {
      method: "POST",
      headers: {
    "Content-Type": "application/json"
      },
    
      body: JSON.stringify({
        username: username,
        email: email,
        password: passw,
        
      })
    });

    if (!response.ok) {
      console.log('Fetch failed in creating user');
    } else {
      const data = await response.json();
      console.log('User created:', data);

      localStorage.setItem('username', data.username || username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id);

      console.log("local sotrage, username:", localStorage.getItem('username'));
      console.log("token", localStorage.getItem('token'));
      console.log("userId", localStorage.getItem('id'))
    }
  } catch (error) {
    console.log('Error:', error);
  }
};




  function checkStr(e){
    const value = e.target.value
    setPassW(value)
    if (value.length >= 6){
      setIsStrong(true)
    }
    else{
      setIsStrong(false)
    }
  }
  
 
  function checkEmail(e){
    const value = e.target.value;
    setEmail(value)
    if (value.includes('@')&& value.includes('.com') || value.includes('.fi') ){
      setIsValid(true)
      
    }
    else{
      setIsValid(false)
    }
  }
  
  
  return (
  <div className="overlay" onClick={onClose}>

    <div className='signupContainer'  onClick={(e) => e.stopPropagation()} >
      
      <h3 >Sign up</h3>

    <p>Email</p>
      <input className='emailInput' 
      placeholder='-- Email here --' 
      onChange={checkEmail}
      style={{border: !email ? "3px solid white":
        isValid
        ?"3px solid green"
        :"3px solid red"}}>
      </input>
      
      {email &&(
         <p style={{ color: isValid ? "green" : "red" }}>
          {isValid ? "Your email is valid" : "Your email is invalid"}
        </p>
      )}
      <p>Password</p>
      <input type='password'className='passwordInput' placeholder='-- Password here --'
      onChange={checkStr}
      style={{border: !passw ?"3px solid white": 
      isStrong
      ?"3px solid green"
      :"3px solid red"}}>
      </input>

      {passw &&(
        <p style={{color: isStrong ? "green" : "red"}}>
          {isStrong ? "Your password is strong" : "Your password is weak"}</p>
      )}
      <p>Username</p>
      <input placeholder="-- Username here --" onChange={(e) => setUsername(e.target.value)}></input>
          <button className="signupButton" onClick={createUser}
      style={{
            fontSize:"medium",
            justifyContent:"center",
            marginTop:"10px",
            padding: "10px 20px",
            background: "Blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >Sign up</button>
      
    <button className="closeButton" onClick={onClose}
      style={{
            float:" right",
            marginTop:"10px",
            padding: "5px 10px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >Close</button>
    </div>

    </div>
  )
}

export default SignupPage