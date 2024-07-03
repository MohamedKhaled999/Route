//Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy0XeJJoKqMoc0d-tL4QjDx6NpKYKtz6c",
  authDomain: "forntendtest.firebaseapp.com",
  projectId: "forntendtest",
  storageBucket: "forntendtest.appspot.com",
  messagingSenderId: "23016456449",
  appId: "1:23016456449:web:88c28f23e1ddb3fadedb00",
  measurementId: "G-TDX5WS6HPG",
  databaseURL:
    "https://console.firebase.google.com/u/1/project/forntendtest/database/forntendtest-default-rtdb/data/~2F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
