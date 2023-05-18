// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDbg0AtqfAVai5A3lQRU_dZNe2CiAxGu7k",
  authDomain: "test-d576f.firebaseapp.com",
  databaseURL: "https://test-d576f-default-rtdb.firebaseio.com",
  projectId: "test-d576f",
  storageBucket: "test-d576f.appspot.com",
  messagingSenderId: "763113519469",
  appId: "1:763113519469:web:cd4a5ec02fb2f5403f8264",
  measurementId: "G-1ZXRJ1CZ3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);