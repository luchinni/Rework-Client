// Import the functions you need from the SDKs you need
/* import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCijOaj_WamE7J1WgEN3yJ5LzqtDvuFVuY",
  authDomain: "reworkhenry.firebaseapp.com",
  projectId: "reworkhenry",
  storageBucket: "reworkhenry.appspot.com",
  messagingSenderId: "125588834339",
  appId: "1:125588834339:web:6a7f2cc1cc5d22aed38996",
  measurementId: "G-QQFX15R1L9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase;