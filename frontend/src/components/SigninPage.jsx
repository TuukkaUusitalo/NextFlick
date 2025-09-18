import React, {useState} from 'react'
import './SignupPage.css'



function SignupPage({onClose}) {
  const [email, setEmail]=useState("");
  const [isValid, setIsValid] = useState(null);
  const [passw, setPassW] = useState("")
  const [isStrong, setIsStrong] = useState(false)


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

    <div className='signinContainer'  onClick={(e) => e.stopPropagation()} >
      
      <h3 >Sign in</h3>

    <p>Email</p>
      <input className='emailInput' 
      placeholder='--Email here--' 
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
      <input type='password'className='passwordInput' placeholder='--Password here--'
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
      
      

    <button className='signUpButton'>Sign in</button>
    <p>{fetchGreeting()}</p>
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