// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5E6EDt6h1r0fpCOw4zk7GSq6t1Nvu6Uk",
  authDomain: "lobby-code.firebaseapp.com",
  projectId: "lobby-code",
  storageBucket: "lobby-code.appspot.com",
  messagingSenderId: "443479512264",
  appId: "1:443479512264:web:092493769eccb3afaac1fd",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
