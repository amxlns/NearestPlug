// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import Home from './Home';
import Education from './Education';
import Rewards from './Rewards';
import Login from './Login';
import Register from './Register';
import EWasteRecognition from './EWasteRecognition';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserPoints(userDoc.data().points || 0);
        } else {
          await setDoc(doc(db, 'users', user.uid), {
            userId: user.uid,
            points: 0,
          });
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = (user, userPoints) => {
    setUser(user); // Update the user state
    setUserPoints(userPoints); // Update the user's points
  };

  const handleRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        points: 0,
      });

      toast.success('Registered successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleGoogleSignIn = (user, userPoints) => {
    setUser(user); // Update the user state
    setUserPoints(userPoints); // Update the user's points
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserPoints(0);
      toast.success('Logged out successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const addPoints = async (points) => {
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        points: userPoints + points,
      });
      setUserPoints(userPoints + points);
      toast.success(`You earned ${points} points!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error('You must be logged in to earn points.', {
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
    <>
      {/* Add the logo above the navigation bar */}
      <div className="logo-container">
        <img src="/logo.png" alt="NearestPlug Logo" className="logo" />
      </div>

      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ewasterecognition">E-Waste Recognition</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/rewards">Rewards</Link></li>
          {user ? (
            <li><button onClick={handleLogout}>Logout</button></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
          
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home user={user} addPoints={addPoints} />} />
        <Route path="/education" element={<Education />} />
        <Route path="/rewards" element={<Rewards userPoints={userPoints} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onGoogleSignIn={handleGoogleSignIn} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/ewasterecognition" element={<EWasteRecognition />} />
      </Routes>

      {/* Add ToastContainer */}
      <ToastContainer />
    </>
  );
}

export default App;