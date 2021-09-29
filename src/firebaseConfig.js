import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5gKw_aTQ9zF29VtmQ7n0ToIRHirxcfJI",
  authDomain: "dashboard-913f7.firebaseapp.com",
  projectId: "dashboard-913f7",
  storageBucket: "dashboard-913f7.appspot.com",
  messagingSenderId: "530532079102",
  appId: "1:530532079102:web:bbc6af8c3fb87928055caf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export {db,auth}