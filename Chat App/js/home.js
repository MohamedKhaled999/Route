import { auth, db } from "./firebaseAppConfig.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  Timestamp,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { uploadImage } from "./upload.js";

//?===========================Golabl==========================>
let currentUser;
let indexOfSlectedUserChat;
let userChatsList = [];
let searchedToAddFriend = [];
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const imgPreview = document.getElementById("imagePreviewer");
const navContentAside = document.getElementById("navContentAside");
const logoutBtn = document.getElementById("logOutBtn");
const myUserChats = document.querySelector("ul.friends-list");
const addFriendBtn = document.getElementById("addFriendBtn");
const sendBtn = document.getElementById("sendBtn");
const messageOtsenderInput = document.getElementById("messageOtsender");
const messageContainer = document.getElementById("messageContainer");
const emojiPicker = document.querySelector("emoji-picker");
const loading = document.getElementById("loading");
var myToast =new bootstrap.Toast(document.getElementById("myToast")) ;


//!===========================when Start======================>
await onAuthStateChanged(auth, async (user) => {
  loading.classList.remove("d-none");

  if (user) {
    navContentAside.children[0].setAttribute("src", "" + user.photoURL);
    navContentAside.children[1].innerHTML = user.displayName;
    currentUser = user;
    await handleUsersChats();
   setInterval(()=>{
    loading.classList.add("d-none");
   },1000)

  } else {
     console.log("no user");

    // document.body.classList.add("d-none");
    loading.classList.add("d-none");

    window.location = "./index.html";
  }
});
//*===========================Events==========================>
logoutBtn.addEventListener("click", async () => {
  console.log("logout");
  try {
    await signOut(auth);
    // console.log("user logout ");
  } catch (error) {
    // console.log(error.message);
  }
});

addFriendBtn.addEventListener("click", () => {
  myModal.show();
});
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key == "Enter" && e.target.tagName.toLowerCase() == "input") {
    switch (e.target.id) {
      case "findFriend":
        console.log("findFriend");
        filterFriends(e.target.value);

        break;
      case "messageOtsender":
        console.log("messageOtsender");
        if (e.target.value) {
          handleSend();
        }

        break;
      case "newFriend":
        console.log("newFriend");
        handleSearchOfNewFriends(e.target.value);
        e.target.value = "";
        break;
    }
    e.target.value = "";
  }
});

document.querySelector("#myModal .btn").addEventListener("click", () => {
  console.log("dkjbhjk");
  let input = document.getElementById("newFriend");
  handleSearchOfNewFriends(input.value);
  input.value = "";
});

document
  .querySelector("#myModal ul")
  .addEventListener("click", async function (e) {
    // e.stopPropagation();
    //
    let index = Array.from(this.children).indexOf(e.target.closest("li"));
    console.log(index);
    await handleSelectOfAdd(index);
  });

myUserChats.addEventListener("click", async function (e) {
  // document.getElementById("findFriend").value="";
  // filterFriends("")
  let ele = e.target.closest("li");
  if (ele.getAttribute("index") != null) {
    // console.log(ele.getAttribute('index'))
    indexOfSlectedUserChat = Number(ele.getAttribute("index"));
  } else {
    indexOfSlectedUserChat = Array.from(myUserChats.children).indexOf(ele);
  }

  console.log(indexOfSlectedUserChat);
  console.log(userChatsList[indexOfSlectedUserChat]);

  await handleChat(indexOfSlectedUserChat);

  document.querySelector(".chat .layer").classList.add("d-none");
  document.querySelector(".chat .under").classList.remove("d-none");
  document.getElementById("findFriend").value = "";
  if (window.innerWidth <= 768) {
    document.querySelector("aside").classList.add("d-none");
    document.querySelector(".chat").style.opacity = 1;
  }
});
document.getElementById("back").addEventListener("click", () => {
  document.querySelector("aside").classList.remove("d-none");
  document.querySelector(".chat").style.opacity = 0;
});
window.addEventListener(
  "resize",
  function (event) {
    if (window.innerWidth > 768) {
      document.querySelector("aside").classList.remove("d-none");
      document.querySelector(".chat").style.opacity = 1;
    }
  },
  true
);

sendBtn.addEventListener("click", () => {
  handleSend();
});

document
  .getElementById("imgChat")
  .addEventListener("change", async function (e) {
    if (e.target.files[0]) {
      let url = await uploadImage(e.target.files[0]);
      console.log("You selected " + e.target.files[0].name, url);
      handleSend(url);
    }
  });

messageContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() == "img") {
    imgPreview.classList.remove("d-none");
    imgPreview.querySelector(".content").style.cssText = `
        background-image: url('${e.target.src}');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}
      `;
    e.stopPropagation();
  }
});
imgPreview.querySelector("i").addEventListener("click", () => {
  imgPreview.classList.add("d-none");
});

imgPreview.querySelector(".content").addEventListener("click", (e) => {
  e.stopPropagation();
});
document.addEventListener("click", (e) => {
  imgPreview.classList.add("d-none");
});
emojiPicker.addEventListener("emoji-click", (e) => {
  messageOtsenderInput.value += e.detail.emoji.unicode;
  console.log(e.detail.emoji.unicode);
});

document.getElementById("emojiIcon").addEventListener("click", () => {
  emojiPicker.classList.toggle("emoji-show");
});

//!===========================Functions======================>

const handleUsersChats = async () => {
  const unsub = onSnapshot(doc(db, "usersChats", currentUser.uid), (doc) => {
    let temp = "";
    userChatsList = [];

    console.log("Current data: ", doc.data());
    // console.log("Current data: ", clone);
    let x = [...Object.entries(doc.data()).sort()];
    console.log(x);
    // let y = [...x];
    x.sort((a, b) => {
      return b[1].date?.seconds - a[1].date?.seconds;
    });

    x.forEach((chat) => {
      console.log(chat[1]);
      userChatsList.push(chat);

      temp += `
                <li class="border-bottom border-1 border-secondary ps-2 ">
                  <div class="item-chat-content  d-flex align-items-center gap-3  position-relative">
                        <img class="bg-black bg-opacity-50 rounded-circle" src="${
                          chat[1].userInfo.photoURL
                        }" alt="avater"  />
                        <div>
                          <span class="user-chat-name fw-bold">${
                            chat[1].userInfo.displayName
                          }</span>
                          <p class="last-message p-0 m-0 text-muted">${
                            chat[1].lastMessage?.text ?? "new freind !"
                          }</p>
                          <div class="circles gap-1 ${
                            chat[1].isSeen ? "d-none" : "d-flex"
                          }">
                        <span class="seen rounded-circle bg-primary opacity-75 me-1
                          position-absolute end-0 top-50 translate-middle-y"></span>
                      </div>
                        </div>
                      </div>
                    </li>`;
    });
    myUserChats.innerHTML = temp;
  });
};

const handleSearchOfNewFriends = async (value) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  // console.log("after query", querySnapshot);
  var temp = "";
  searchedToAddFriend = [];
  let i = 0;
  querySnapshot.forEach((doc) => {
    if (
      String(doc.data().displayName)
        .toLocaleLowerCase()
        .includes(value.toLowerCase())
    ) {
      searchedToAddFriend.push(doc.data());
      temp += `
              <li
                    class="border-top border-bottom border-1 border-secondary rounded-4"
                   
                  >
                    <div
                      class="item-chat-content d-flex align-items-center gap-3"
                    >
                      <img
                        class="bg-black bg-opacity-50 rounded-circle"
                        src="${doc.data().photoURL}"
                        alt="avater"

                      />

                      <div>
                        <span class="user-chat-name fw-bold"
                          >${doc.data().displayName}</span
                        >
                        <p class="last-message p-0 m-0 text-muted">
                          click to add
                        </p>
                      </div>
                    </div>
                  </li>
          `;

      console.log(doc.id, " => ", doc.data());
    }
  });

  document.querySelector("#myModal ul").innerHTML = temp;
};

const handleSelectOfAdd = async (index) => {
  // check if there any  chats collection , if not create it

  const combinedId =
    currentUser.uid > searchedToAddFriend[index].uid
      ? currentUser.uid + searchedToAddFriend[index].uid
      : searchedToAddFriend[index].uid + currentUser.uid;
  console.log("combinedId", combinedId, index, searchedToAddFriend);

  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create user chats
      await setDoc(doc(db, "chats", combinedId), {
        messages: [],
        createdAt: serverTimestamp(),
      });

      //create user chat in usersChats collection'
      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: searchedToAddFriend[index].uid,
          displayName: searchedToAddFriend[index].displayName,
          photoURL: searchedToAddFriend[index].photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "usersChats", searchedToAddFriend[index].uid), {
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

const handleChat = async (indexOfSlectedUserChat) => {
  const combinedId =
    currentUser.uid > userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      ? currentUser.uid + userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      : userChatsList[indexOfSlectedUserChat][1].userInfo.uid + currentUser.uid;

  document.querySelector(".chat .myNav span").innerHTML =
    userChatsList[indexOfSlectedUserChat][1].userInfo.displayName;
  document.querySelector(".chat .myNav img").src =
    userChatsList[indexOfSlectedUserChat][1].userInfo.photoURL;
  console.log(currentUser, combinedId);

  await updateDoc(doc(db, "usersChats", currentUser.uid), {
    [combinedId + ".isSeen"]: true,
  });

  const unsub2 = onSnapshot(doc(db, "chats", combinedId), (doc) => {
    console.log(doc.data(), combinedId);
    if (doc.exists()) {
      // set messages
      let temp = "";
      doc.data().messages.forEach((msg) => {
        if (msg.senderId == currentUser.uid) {
          temp += `
            <div class=" receiver align-self-end d-flex align-items-center">
                  <div class="  rounded-start rounded-bottom bg-info ${
                    msg?.fileURl != "undefined" ? "p-0" : "p-2"
                  } m-2"> ${msg?.text}
                  <img class="w-100 ${
                    msg?.fileURl != "undefined" ? "d-block" : "d-none"
                  }" src="${msg?.fileURl}" alt="chat image" 
                  style="min-height: 150px">
                  </div>
            <img class="bg-black bg-opacity-50 rounded-circle align-self-end" src="${
              currentUser.photoURL
            }" alt="avater"  />
  
                </div>`;
        } else {
          temp += `
                <div class="sender align-self-start d-flex align-items-center">
                                <img class="bg-white rounded-circle" src="${
                                  userChatsList[indexOfSlectedUserChat][1]
                                    .userInfo.photoURL
                                }" alt="avater" style="height: 38px; width: 38px" />
                  <div class="  rounded-end rounded-bottom bg-white bg-opacity-25 ${
                    msg?.fileURl != "undefined" ? "p-0" : "p-2"
                  }  m-2">${msg?.text}
                                    <img class="w-100 ${
                                      msg?.fileURl != "undefined"
                                        ? "d-block"
                                        : "d-none"
                                    }"
                                     src="${msg?.fileURl}" alt="chat image"
                                     style="min-height: 150px">

                  </div>
                </div>
  `;
        }
      });
      messageContainer.innerHTML = temp;
      //   messageContainer.children[messageContainer.children.length-1].s=0;
      messageContainer.scrollTo(0, messageContainer.scrollHeight);
      console.log("massges handle chats", doc.data());
    } else {
    }
  });
};

const handleSend = async (imgURl) => {
  console.log("handleSend", imgURl);
  const combinedId =
    currentUser.uid > userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      ? currentUser.uid + userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      : userChatsList[indexOfSlectedUserChat][1].userInfo.uid + currentUser.uid;
  // you can handle part of send image here!
  // you can handle part of send text here!
  let megToSend = messageOtsenderInput.value.trim();

  console.log("handleSend", megToSend.length);

  if (megToSend || imgURl) {
    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion({
        text: megToSend,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        fileURl: String(imgURl),
      }),
    });

    console.log([
      currentUser.uid,
      userChatsList[indexOfSlectedUserChat][1].userInfo.uid,
    ]);
    await updateDoc(doc(db, "usersChats", currentUser.uid), {
      [combinedId + ".lastMessage"]: {
        text: imgURl ? "Photo🧧" : megToSend + "",
      },
      [combinedId + ".isSeen"]: true,
      [combinedId + ".date"]: serverTimestamp(),
    });

    console.log(
      userChatsList.find((x, index) => {
        if (x[0] == combinedId) {
          indexOfSlectedUserChat = index;
          return true;
        }
        return false;
      }),
      indexOfSlectedUserChat
    );

    console.log("outer", userChatsList[indexOfSlectedUserChat][1].userInfo.uid);
    await updateDoc(
      doc(
        db,
        "usersChats",
        userChatsList[indexOfSlectedUserChat][1].userInfo.uid
      ),
      {
        [combinedId + ".lastMessage"]: {
          text: imgURl ? "Photo🧧" : megToSend + "",
        },
        [combinedId + ".isSeen"]: false,
        [combinedId + ".date"]: serverTimestamp(),
      }
    );
    messageOtsenderInput.value = "";

    console.log(
      userChatsList.find((x, index) => {
        if (x[0] == combinedId) {
          indexOfSlectedUserChat = index;
          return true;
        }
        return false;
      }),
      indexOfSlectedUserChat
    );
  }
};
const filterFriends = (x) => {
  console.log("x", x);
  let filterList = userChatsList.filter((chat, index) => {
    if (chat[1].userInfo.displayName.toLowerCase().includes(x.toLowerCase())) {
      chat[1].index = index;
      return true;
    }
    return false;
  });
  console.log(filterList);

  let temp = "";
  filterList.forEach((chat) => {
    console.log(chat[1]);

    temp += `
              <li class="border-bottom border-1 border-secondary ps-2 " index="${
                chat[1].index
              }">
                <div class="item-chat-content  d-flex align-items-center gap-3  position-relative">
                      <img class="bg-black bg-opacity-50 rounded-circle" src="${
                        chat[1].userInfo.photoURL
                      }" alt="avater"  />
                      <div>
                        <span class="user-chat-name fw-bold">${
                          chat[1].userInfo.displayName
                        }</span>
                        <p class="last-message p-0 m-0 text-muted">${
                          chat[1].lastMessage?.text ?? "new freind !"
                        }</p>
                        <div class="circles gap-1 ${
                          chat[1].isSeen ? "d-none" : "d-flex"
                        }">
                      <span class="seen rounded-circle bg-primary opacity-75 me-1
                        position-absolute end-0 top-50 translate-middle-y"></span>
                    </div>
                      </div>
                    </div>
                  </li>`;
  });
  myUserChats.innerHTML = temp;
};
function showMyToast(meg,colorClass){

  var toast =document.getElementById("myToast");
  document.querySelector(".toast-body").innerHTML = meg;
  toast.classList.remove("bg-danger","bg-success");

    toast.classList.add(colorClass);
    myToast.show();
    setTimeout(function () {
      myToast.hide();
    }, 2000);
}

//*===========================Validation======================>
