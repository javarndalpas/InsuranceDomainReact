// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDDrY0gkgN9dT9cTEb2urwv00yn0yQCJFU",
  authDomain: "insurancedomainreact.firebaseapp.com",
  projectId: "insurancedomainreact",
  storageBucket: "insurancedomainreact.firebasestorage.app",
  messagingSenderId: "67412742908",
  appId: "1:67412742908:web:0ef70f5740c94c4edffd79",
  measurementId: "G-Y77R0FCVW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    
const db = getFirestore(app)