// src/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onRegister(email, password);
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;