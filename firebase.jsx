// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyClDjHPbtvcuQlEZorcY05y_DFpEuXdbpc",
  authDomain: "hangman-7ed80.firebaseapp.com",
  projectId: "hangman-7ed80",
  storageBucket: "hangman-7ed80.appspot.com",
  messagingSenderId: "523974088957",
  appId: "1:523974088957:web:59d16a3b9975a428ad0694",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
