import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
        const userData = {
            username: username,
            password: password,
        };
        console.log('Sending login request with data:', userData);
        const response = await axios.post('https://skoog-music.onrender.com/login', userData);
        console.log('Received response:', response);
        const jwtToken = response.data.data;
        console.log('JWT token received:', jwtToken);
        
        // Save token and username in localStorage
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('username', username);

        console.log('Login successful.');
        if (username === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
      try {
          const userData = {
              username: username,
              password: password,
          };
          console.log('Sending Register request with data:', userData);
          // change to register
          const response = await axios.post('https://skoog-music.onrender.com/register', userData);
          console.log('Received response:', response);
          const jwtToken = response.data.data;
          console.log('JWT token received:', jwtToken);
          
          // Save token and username in localStorage
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('username', username);

          console.log('Register successful. Navigating to home page...');
          navigate('/');
      } catch (error) {
          console.error('Register failed:', error);
      }
  };






  return (
    <div className='login'>
      <div className='content'>
        <div className='login-wrapper'>
          <div className='left-wrapper'>
            <div className='glass'>
              <div className='titles'>
                <h1 className='skoog'>Skoog</h1>
                <span className='banner'>Join us!</span>
              </div>
            </div>
          </div>
          <div className='right-wrapper'>
            <div className='form-wrapper'>
              <h1 className='login'>Login</h1>
              <div className='input-elems'>
                <span className='name'>Username</span>
                <input
                  type='text'
                  className='input'
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className='input-elems'>
                <span className='name'>Password</span>
                <input
                  type='password'
                  className='input'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button className="button" onClick={handleLogin}>
                LOGIN
              </button>
              <button className="button" onClick={handleRegister}>
                REGISTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
