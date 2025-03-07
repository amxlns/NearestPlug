/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTcgDN_qw41lTwneGQn8kHf5yaVHcq4hI",
  authDomain: "nearestplug.firebaseapp.com",
  projectId: "nearestplug",
  storageBucket: "nearestplug.firebasestorage.app",
  messagingSenderId: "379912197909",
  appId: "1:379912197909:web:a538ecaeb952dc9d187b1c",
  measurementId: "G-DTETDSK00J"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider }; // Export Firebase services