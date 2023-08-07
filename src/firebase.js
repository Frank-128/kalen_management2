// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPupQNKE1VEW2pYsNtzWF0FWxt0xiRXFM",
  authDomain: "kalenstaff.firebaseapp.com",
  projectId: "kalenstaff",
  storageBucket: "kalenstaff.appspot.com",
  messagingSenderId: "652189168820",
  appId: "1:652189168820:web:46a78f3e04c8d13d0e93e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export  const auth = getAuth(app);
