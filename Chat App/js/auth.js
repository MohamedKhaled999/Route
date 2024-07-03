// import {
//   getAuth,
//   createUserWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// import { myAuth } from  "./index.js";


// export const handleAuth = (app,doc) => {

//  var auth = getAuth(app)


//   console.log("sss",auth);
//   // handleLogin(auth, doc);
//   // handleSignUp(auth, doc);
//   // handleLogOut(auth);
// };


// export const handleSignUp = (doc) => {
//   const signUpBtn = doc.getElementById("signUpBtn");
//   const signUpForm = doc.getElementById("signUpForm");
//   console.log("ddfvgfdsdf", signUpForm);
//   console.log(signUpBtn);

//   signUpBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log(
//       "sign Up",
//       signUpForm.children[2].value,
//       signUpForm.children[3].value
//     );

//     console.log(myAuth);

//   });
// };


// export const handleLogin = (doc) => {
//   const loginBtn = doc.getElementById("loginBtn");
//   const loginForm = doc.getElementById("loginForm");
//   console.log(loginForm.children[1].value);
//   loginBtn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     console.log(
//       "LOG IN",
//       loginForm.children[1].value,
//       loginForm.children[2].value
//     );

//   });
// };





