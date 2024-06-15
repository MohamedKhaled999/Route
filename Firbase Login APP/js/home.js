import { getMyAuth, db, app } from "./index.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// import {

//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//   } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const logoutBtn = document.getElementById("btnLogOut");
const findFriendInput = document.getElementById("findFriend");
const messageOtsenderInput = document.getElementById("messageOtsender");
const sendBtn = document.getElementById("sendBtn");
const searchUsers = document.getElementById("searchUsers");
const navContentAside = document.getElementById("navContentAside");
const myUserChats = document.querySelector("ul");

var searchedUsersList = [];
var userChatsList = [];

var currentUser;
var index;
var indexOfSlectedUserChat;

await onAuthStateChanged(getMyAuth(), (user) => {
  if (user) {
    console.log("onAuthStateChanged", user);
    console.log("onAuthStateChanged", getMyAuth().currentUser.uid);
    console.log("navContentAside", navContentAside, user);
    // setup nav
    navContentAside.children[0].setAttribute("src", "" + user.photoURL);
    navContentAside.children[1].innerHTML = user.displayName;
    currentUser = user;
    handleUsersChats();
  } else {
    console.log("no user");

    document.body.classList.add("d-none");
    window.location = "./index.html";
  }
});

const handleUsersChats = () => {
  const unsub = onSnapshot(doc(db, "usersChats", currentUser.uid), (doc) => {
    let temp = "";
    userChatsList = [];
    Object.entries(doc.data()).forEach((chat) => {
      userChatsList.push(chat);

      temp += `
            <li class="border-bottom border-1 border-secondary ps-2">
                <div class="item-chat-content  d-flex align-items-center gap-3">
                  <img class="bg-danger rounded-circle" src="${chat[1].userInfo.photoURL}" alt=""  />
                  <div>
                    <span class="user-chat-name fw-bold">${chat[1].userInfo.displayName}</span>
                    <p class="last-message p-0 m-0 text-muted">${chat[1].lastMessage?.text}</p>
                  </div>
                </div>
              </li>`;
    });
    myUserChats.innerHTML = temp;

    console.log("Current data: ", doc.data());
    console.log("userChatsList: ", userChatsList);
  });
};

const handleLogout = () => {
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      console.log("logout");
      try {
        signOut(getMyAuth());
        console.log("user logout ");
      } catch (error) {
        console.log(error.message);
      }
    });
  }
};

handleLogout();

const handleSearch = () => {
  findFriendInput.addEventListener("keydown", async (e) => {
    if (e.key == "Enter") {
      console.log("after enter", findFriendInput.value);
      //   const q = query(
      //     collection(db, "users"),
      //     where("displayName", "array-contains", findFriendInput.value)
      //   );
      //Execute a query
      //   const querySnapshot = await getDocs(q);
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log("after query", querySnapshot);
      var temp = "";
      searchUsers.classList.remove("d-none");
      searchedUsersList = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        if (
          String(doc.data().displayName)
            .toLocaleLowerCase()
            .includes(findFriendInput.value.toLowerCase())
        ) {
          searchedUsersList.push(doc.data());
          temp += `
             <div class=" search-item  ps-1 d-flex align-items-center gap-3">
                  <img class="bg-danger rounded-circle" src="${
                    doc.data().photoURL
                  }" alt="${doc.data().displayName}" />
                  <div>
                    <span class="user-chat-name fw-bold">${
                      doc.data().displayName
                    }</span>
                    <p class=" p-0 m-0 text-muted"> hello there </p>
                  </div>
                </div>
            `;

          console.log(doc.id, " => ", doc.data());
        }
      });

      searchUsers.innerHTML = temp;
    }
  });
};

handleSearch();

////////////////////////////////////////
myUserChats.addEventListener("click", async function (e) {
 
  indexOfSlectedUserChat = Array.from(myUserChats.children).indexOf(
    e.target.closest("li")
  );
  handleChat();
  console.log("target.closest", e.target.closest(".item-chat-content"),indexOfSlectedUserChat);
});

searchUsers.addEventListener("click", async function (e) {
  e.stopPropagation();

  console.log("target.closest", e.target.closest(".search-item"));
  index = Array.from(searchUsers.children).indexOf(
    e.target.closest(".search-item")
  );
  await handleSelect();
});
document.addEventListener("click", function (e) {
  searchUsers.classList.add("d-none");
});

////////////////////////////////////
const handleChat = async ()=>{

    const combinedId =
    currentUser.uid > userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      ? currentUser.uid + userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      : userChatsList[indexOfSlectedUserChat][1].userInfo.uid + currentUser.uid;

    document .querySelector('.chat .myNav span').innerHTML=userChatsList[indexOfSlectedUserChat][1].userInfo.displayName
    console.log(currentUser,combinedId)


}




const handleSelect = async () => {
  // check if there any  chats collection , if not create it

  //   console.log("inside", getMyAuth().currentUser);

  const combinedId =
    currentUser.uid > searchedUsersList[index].uid
      ? currentUser.uid + searchedUsersList[index].uid
      : searchedUsersList[index].uid + currentUser.uid;
  console.log("combinedId", combinedId, index, searchedUsersList);

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create user chats
      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      //create user chat in usersChats collection'
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: searchedUsersList[index].uid,
          displayName: searchedUsersList[index].displayName,
          photoURL: searchedUsersList[index].photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "usersChats", searchedUsersList[index].uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};
