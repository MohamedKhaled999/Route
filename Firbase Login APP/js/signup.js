import { getMyAuth  } from "./index.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
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


         
      await updateProfile(getAuth().currentUser, {
        displayName: signUpForm.children[1].value, photoURL: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1717969382~exp=1717969982~hmac=fd3fb60949a48efede188c4a7ebec3d55297a32041a4e1ac42d894ad74be203b"
      }).then(() => {
        console.log("Profile updated!")
        // Profile updated!
        // ...
      }).catch((error) => {
        console.log("Profile  not updated!",error)

        // An error occurred
        // ...
      });

        signUpForm.reset();
  
      } catch (error) {
        console.log("error",error)
      }

  });
};

handleSignUp();
