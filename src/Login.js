import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth, googleProvider, db } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Login({ onLogin, onGoogleSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user's points from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userPoints = userDoc.exists() ? userDoc.data().points || 0 : 0;

      // Call onLogin with the user and their points
      onLogin(user, userPoints);

      // Show success message
      toast.success('Logged in successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to home page
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Email/Password Sign-In Error:', error);
      setError('Failed to log in. Please check your email and password.');

      // Show error message
      toast.error('Failed to log in. Please check your email and password.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Fetch user's points from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      const userPoints = userDoc.exists() ? userDoc.data().points || 0 : 0;

      // Call onGoogleSignIn with the user and their points
      onGoogleSignIn(user, userPoints);

      // Show success message
      toast.success('Logged in successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect to home page
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('Failed to sign in with Google. Please try again.');

      // Show error message
      toast.error('Failed to sign in with Google. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}

      {/* Email/Password Login Form */}
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
        <button type="submit">Login</button>
      </form>

      {/* Google Sign-In Button */}
      <div>
        <button onClick={handleGoogleSignIn} className="google-sign-in">
          <img src="/google-logo.png" alt="Google Logo" /> Sign in with Google
        </button>
      </div>

      {/* Sign-Up Link */}
      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;