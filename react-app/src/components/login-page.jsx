import "../styles/login-page.css"
import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

function LoginPage({ setAccessType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setMessage('Login successful!');
      setAccessType('user'); 
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleRegister = async () => {
    console.log("got here")
    try {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setMessage('Registration successful! Please log in.');
      setIsRegistering(false);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleGuestAccess = () => {
    setAccessType('guest'); 
    setMessage('Continuing as guest...');
    navigate('/home')
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistering ? (
        <button onClick={handleRegister}>Register</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
      <button onClick={handleGuestAccess}>Continue as Guest</button>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Back to Login' : 'Create an Account'}
      </button>
      <p>{message}</p>
    </div>
  );
}

export default LoginPage;


LoginPage.propTypes = {
  setAccessType: PropTypes.func.isRequired
}