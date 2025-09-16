import React, {useState} from 'react'
import './SignupPage.css'



function SignupPage() {
  const [nationality, setNationality]=useState("");
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


  function greetingLanguage(e){
    const value = e.target.value
    if (value === 'Finland')
      setNationality("Finland")
    if (value === 'England')
      setNationality("England")
    if (value === 'German')
      setNationality("German")
    if (value === 'France')
      setNationality("France")
  }

  function fetchGreeting(){
    if (nationality==='Finland')
      return(
      <div>
        <p>Moi,</p>
        <p>Sähköpostisi on: {email}</p>
      </div>
      )
    if (nationality==='England')
      return(
      <div>
        <p>Hello,</p>
        <p>Your email is: {email}</p>
      </div>
      )
    if (nationality==='German')
      return(
      <div>
        <p>Hallo,</p>
        <p>Ihre email lautet: {email}</p>
      </div>
        )
    if (nationality==='France')
      return(
      <div>
        <p>Bonjour,</p>
        <p>Votre email est: {email}</p>
      </div>
      )
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
    <div className='signupContainer' onClick={onClose}>
      <h3>Sign up</h3>

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
      
      
      <p>Nationality</p>
      <div>
      <select onChange={greetingLanguage} defaultValue="">
        <option value="" disabled>
            -- Select nationality --
          </option>
        <option value="Finland">Finland</option>
        <option value="England">England</option>
        <option value="German">German</option>
        <option value="France">France</option>
      </select>
    </div>
    <button className='signUpButton'>Sign up</button>
    <p>{fetchGreeting()}</p>
    </div>

    
  )
}

export default SignupPage