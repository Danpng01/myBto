// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // If using Firestore
import { getAuth } from 'firebase/auth'; // If using Firebase Authenticatio


const firebaseConfig = {
  apiKey: "AIzaSyBtLaQLfu9xQsmUabNfYcpTXngQarheUIQ",
  authDomain: "mybto-5b267.firebaseapp.com",
  projectId: "mybto-5b267",
  storageBucket: "mybto-5b267.appspot.com",
  messagingSenderId: "770159777045",
  appId: "1:770159777045:web:a8c6dfa5e0818de622c51c",
  measurementId: "G-6R89M2KP3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };

