import { auth, db } from "./firebaseAppConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export const handleLogin = async (user) => {
  console.log(user);

  try {
    const cradintials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    console.log("cradintials", cradintials);
    if (auth.currentUser) {
      console.log("currentUser", auth.currentUser);
      return auth.currentUser;
    }
    // window.location = "./home.html";
    loginForm.reset();
  } catch (error) {
    console.log(error);
  }
};

const handleSignUp = async (user) => {
  try {
    const cradintials = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    console.log("cradintials", cradintials);

    let imgURL = null;
    const tempImg =
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1717969382~exp=1717969982~hmac=fd3fb60949a48efede188c4a7ebec3d55297a32041a4e1ac42d894ad74be203b";

    await updateProfile(auth.currentUser, {
      displayName: user.name,
      photoURL: imgURL ? imgURL : tempImg,
    })
      .then(async () => {
        console.log("Profile updated!");

        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log("Profile  not updated!", error);

        // An error occurred
        // ...
      });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      displayName: user.name,
      email: user.email,
      photoURL:
        "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611710.jpg?w=740&t=st=1717969382~exp=1717969982~hmac=fd3fb60949a48efede188c4a7ebec3d55297a32041a4e1ac42d894ad74be203b",
    });

    await setDoc(doc(db, "usersChats", auth.currentUser.uid), {});
  } catch (error) {
    console.log("error", error);
  }
};
