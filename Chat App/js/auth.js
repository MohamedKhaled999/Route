import { auth, db } from "./firebaseAppConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { uploadImage } from "./upload.js";

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

    // loginForm.reset();
    // window.location = "./home.html";
  } catch (error) {
    console.log(error);
  }
};

export const handleSignUp = async (user) => {
  try {
    const cradintials = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    console.log("cradintials", cradintials);
    console.log(auth.currentUser.uid);

    let imgURL = null;
    if (user.imgFile) {
      imgURL = await uploadImage(user.imgFile);
    }
    // console.log(imgURL)
    console.log(imgURL);
    const tempImg =
      "https://firebasestorage.googleapis.com/v0/b/forntendtest.appspot.com/o/images%2Fpaper-plane_753603.png?alt=media&token=753319be-bc90-4a8e-838b-38b738fbfc64";
    await updateProfile(auth.currentUser, {
      displayName: user.name,
      photoURL: imgURL ?? tempImg,
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
      photoURL: imgURL ?? tempImg,
    });

    await setDoc(doc(db, "usersChats", auth.currentUser.uid), {});
  } catch (error) {
    console.log("error", error);
  }
};
