// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firestore from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxy1j3gVBl5XWItfjsObxEQyFO-JQtIvk",
  authDomain: "future-love-82e26.firebaseapp.com",
  projectId: "future-love-82e26",
  storageBucket: "future-love-82e26.appspot.com",
  messagingSenderId: "773045950861",
  appId: "1:773045950861:web:5327f65811e92de57805c4",
  measurementId: "G-LESK55KLS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = firestore;
const analytics = getAnalytics(app);
export { db };
