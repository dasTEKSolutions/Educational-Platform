// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNojbcS0X-p_5kBfSI3v04SnmpfbEAeKk",
  authDomain: "dastek-edu.firebaseapp.com",
  databaseURL: "https://dastek-edu-default-rtdb.firebaseio.com",
  projectId: "dastek-edu",
  storageBucket: "dastek-edu.appspot.com",
  messagingSenderId: "182505445583",
  appId: "1:182505445583:web:4a12aa0a375e7387dcffba",
  measurementId: "G-VKXTS79SPP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
