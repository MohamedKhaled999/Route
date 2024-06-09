import { getMyAuth } from "./index.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signUpBtn = document.getElementById("signUpBtn");
const signUpForm = document.getElementById("signUpForm");

const handleSignUp = () => {
  console.log("ddfvgfdsdf", signUpForm);
  console.log(signUpBtn);

  signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(
      "sign Up",
      signUpForm.children[2].value,
      signUpForm.children[3].value
    );

    console.log(getMyAuth());


    try {
        const cradintials= await  createUserWithEmailAndPassword(
            getMyAuth(),
          signUpForm.children[2].value,
          signUpForm.children[3].value
        );
         console.log("cradintials", cradintials);
        signUpForm.reset();
  
      } catch (error) {
        console.log("error",error)
      }

  });
};

handleSignUp();
