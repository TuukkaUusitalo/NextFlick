import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tyhjennetään kirjautumistiedot
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.setItem("isAuthenticated", "false");
    localStorage.setItem("loginStatus", "false");
    localStorage.removeItem("user");

    console.log('User logged out successfully.');
    
    //runs twice only on development
    alert("You have been signed out.");

    // Palataan etusivulle
    navigate('/');
    //force reload
    setTimeout(() => window.location.reload(), 100);
  }, [navigate]);

  return null;
}


export default SignoutPage;
