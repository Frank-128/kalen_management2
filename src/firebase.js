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
  apiKey: "AIzaSyBRKeSWY6kP9qpuIUcjinWv8OPxKXj5Hts",
  authDomain: "staffmanager-d31db.firebaseapp.com",
  projectId: "staffmanager-d31db",
  storageBucket: "staffmanager-d31db.appspot.com",
  messagingSenderId: "612804921436",
  appId: "1:612804921436:web:1ae05b706f846814af3e99",
  measurementId: "G-J53JMLBH86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export  const auth = getAuth(app);
