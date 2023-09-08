import React, { useState } from 'react';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login">
        <div className="content">
        <div className="login-wrapper">
            <div className="left-wrapper">
                <div className="glass">
                <div className="titles">
                    <h1 className="skoog">Skoog</h1>
                    <span className="banner">Join us!</span>
                </div>
                </div>
            </div>
            <div className="right-wrapper">
            <div className="form-wrapper">
                <h1 className="login">Login</h1>
                <div className="input-elems">
                <span className="name">Username</span>
                <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={handleUsernameChange}
                />
                </div>
                <div className="input-elems">
                <span className="name">Password</span>
                <input
                    type="password"
                    className="input"
                    value={password}
                    onChange={handlePasswordChange}
                />
                </div>
                <button className="button" onClick={handleLogin}>
                LOGIN
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Login;
