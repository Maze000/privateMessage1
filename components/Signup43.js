import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import './signup.css'
const Signup43 = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

  const signup = (email, password) => {
    
    fetch('/signup2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        console.log('Respuesta recibida', response);
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
          console.log('este es el mensaje recibido de la base de datos',data.message);

          localStorage.setItem('token', data.token);
          

          navigate('/consola');
      })
      .catch(error => {
        console.error('Error en el registro:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">SIGN UP</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="signup-input-email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="signup-input-password"
          />
          <button type="submit" className="signup-btn-submit">Sign Up</button>
          <Link to="/login">
            <button className="signup-btn-login">You have an account</button>
          </Link>
        </form>
      </div>
    </div>
  );
  
  
};

export default Signup43;
