// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmtjBA-B-93QmXuLqhP_FAJXRdAm4es04",
  authDomain: "agriquiz-24.firebaseapp.com",
  projectId: "agriquiz-24",
  storageBucket: "agriquiz-24.appspot.com",
  messagingSenderId: "398472400114",
  appId: "1:398472400114:web:c4a9bb9d19089bac0f546b",
  measurementId: "G-3CDPZ213WJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 