// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmSd_lIh1pj6MkT1UtFPrj7KJt8L35I1s",
  authDomain: "eyelashes-5279b.firebaseapp.com",
  databaseURL:
    "https://eyelashes-5279b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "eyelashes-5279b",
  storageBucket: "eyelashes-5279b.appspot.com",
  messagingSenderId: "269971089142",
  appId: "1:269971089142:web:03dd38569adc5dab8b2ed7",
  measurementId: "G-DXQPN5B3PM",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
// export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
