import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = () => {
 
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  

  const login = (email, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en el inicio de sesión');
        }
        return response.json();
      })
      .then(data => {

        console.log('Inicio de sesión exitoso:', data);
        if (data.token) {

          localStorage.setItem('token', data.token);

          navigate('/consola');
        }

      })
      .catch(error => {

        console.error('Error en el inicio de sesión:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username or Email"
            className="input-text"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-password"
          />
          <button type="submit" className="btn-login">Login</button>
          <Link to="/signup">
            <button className="btn-signup">You do not have an account</button>
          </Link>
        </form>
      </div>
    </div>
  );
  
  
};

export default Login;