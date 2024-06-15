import { getMyAuth,db  } from "./index.js";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore ,collection, addDoc,setDoc,doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
import { getDatabase ,ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"



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


         
      await updateProfile(getMyAuth().currentUser, {
        displayName: signUpForm.children[1].value, photoURL: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1717969382~exp=1717969982~hmac=fd3fb60949a48efede188c4a7ebec3d55297a32041a4e1ac42d894ad74be203b"
      }
    ).then(async () => {
        console.log("Profile updated!")

        // Profile updated!
        // ...
      }).catch((error) => {
        console.log("Profile  not updated!",error)

        // An error occurred
        // ...
      });

      await setDoc(doc(db ,"users",getMyAuth().currentUser.uid),{
        uid:getMyAuth().currentUser.uid,
        displayName:signUpForm.children[1].value,
        email:signUpForm.children[2].value,
        photoURL: "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1717969382~exp=1717969982~hmac=fd3fb60949a48efede188c4a7ebec3d55297a32041a4e1ac42d894ad74be203b"

      });

      await setDoc(doc(db ,"usersChats",getMyAuth().currentUser.uid),{
       
      });



        signUpForm.reset();
  
      } catch (error) {
        console.log("error",error)
      }

  });
};

handleSignUp();
