// Import the functions you need from the SDKs you need
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

/////////////////////////
// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
/////////////////////////////////////

const analytics = getAnalytics(app);

const auth = getAuth(app);

//  -----------
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");

const handleLogin = () => {
  // console.log(loginForm.children[1].value);
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(
      "LOG INN",
      loginForm.children[1].value,
      loginForm.children[2].value
    );

    try {
      const cradintials = await signInWithEmailAndPassword(
        auth,
        loginForm.children[1].value,
        loginForm.children[2].value
      );
      console.log("cradintials", cradintials);
      if (auth.currentUser) {
        console.log("currentUser", auth.currentUser);
      }
      window.location = "./home.html";
      loginForm.reset();
    } catch (error) {
      console.log(error);
    }
  });
};

if (loginBtn) {
  handleLogin();
}
export const getMyAuth = () => {
  return auth;
};

export const getDB = () => {
  return getFirestore();
};
export const myCurrentUser = auth.currentUser;