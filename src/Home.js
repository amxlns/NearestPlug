// src/Home.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { db } from './firebase';
import { collection,setDoc , getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './Home.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

function Home({ user }) {
  const [centers, setCenters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestCenter, setNearestCenter] = useState(null);
  const [userPoints, setUserPoints] = useState(0);

  // Fetch user's points from Firestore
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserPoints(userDoc.data().points || 0);
        }
      }
    };

    fetchUserPoints();
  }, [user]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch recycling centers from Firestore
  useEffect(() => {
    const fetchCenters = async () => {
      const querySnapshot = await getDocs(collection(db, 'recyclingCenters'));
      const centersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCenters(centersData);
    };

    fetchCenters();
  }, []);

  // Find the nearest center
  useEffect(() => {
    if (userLocation && centers.length > 0) {
      const nearest = findNearestCenter(userLocation, centers);
      setNearestCenter(nearest);
    }
  }, [userLocation, centers]);

  // Function to calculate the nearest center
  const findNearestCenter = (userLocation, centers) => {
    let nearest = null;
    let minDistance = Infinity;

    centers.forEach((center) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        center.latitude,
        center.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        nearest = center;
      }
    });

    return nearest;
  };

  // Function to calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Function to add points
  const addPoints = async (pointsToAdd) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const currentPoints = userDoc.data().points || 0;
        await updateDoc(userRef, { points: currentPoints + pointsToAdd });
        setUserPoints(currentPoints + pointsToAdd);
        toast.success(`${pointsToAdd} points added!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        await setDoc(userRef, { points: pointsToAdd });
        setUserPoints(pointsToAdd);
      }
    }
  };

  const openGoogleMaps = () => {
    if (userLocation && nearestCenter) {
      const origin = `${userLocation.lat},${userLocation.lng}`;
      const destination = `${nearestCenter.latitude},${nearestCenter.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      window.open(url, '_blank');
    } else {
      toast.error('Unable to open Google Maps. Please try again.', {
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
    <div className="home-container">
      <h1>Find the Nearest Recycling Center</h1>

      <LoadScript googleMapsApiKey="AIzaSyA4G1CW4umaQ6aBU2S5gMo1Aq4XHniaKAg">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={userLocation || center}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              label="You"
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              }}
            />
          )}
          {centers.map((center) => (
            <Marker
              key={center.id}
              position={{ lat: center.latitude, lng: center.longitude }}
              label={center.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <br></br>
      {/* Display nearest center details */}
      {nearestCenter && (
        <div className="nearest-center">
          <h2>Nearest Recycling Center</h2>
          <p><strong>Name:</strong> {nearestCenter.name}</p>
          <p><strong>Address:</strong> {nearestCenter.address}</p>
          <p><strong>Contact:</strong> {nearestCenter.phone}</p>

          {/* Button to open Google Maps */}
          <button onClick={openGoogleMaps} className="map-button">
            Get Directions on Google Maps
          </button>

          {/* Button to collect points */}
          {user && (
            <div className="points-section">
              <p>Just recycled? Collect your points!</p>
              <button onClick={() => addPoints(10)} className="points-button">
                +10 Points
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;