
import firebase from "firebase";

//usamos la configuracion de Firebase para poder hacer el request de Google y lo exportamos
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