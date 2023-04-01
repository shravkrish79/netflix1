// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQPQovnv59hkwfRs4dW16rrkcScJB52as",
  authDomain: "netflix-sk1.firebaseapp.com",
  projectId: "netflix-sk1",
  storageBucket: "netflix-sk1.appspot.com",
  messagingSenderId: "224439820859",
  appId: "1:224439820859:web:6031a04b82374481a0b21e",
  measurementId: "G-9NGHYV9VS8"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const database = getFirestore(firebase);
export const cloudStorage = getStorage(firebase);
export const auth = getAuth(firebase);



