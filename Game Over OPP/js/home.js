/// <reference types="../@types/jquery"/>
import { Game } from "./game.module.js";
//?===========================Golabl======================>
// let playVideo = game.playVideo;
// let stopVideo = game.stopVideo;

  const registeForm = document.querySelector("form");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const errorMessage = document.getElementById("errorMessage");
const menu = document.getElementById("menu");
// const loading = document.getElementById("loading");
const logoutBtn = document.getElementById("logoutBtn");
// myModal.show()
//!===========================when Start======================>

if (localStorage.getItem("theme") != null) {
  const themeData = localStorage.getItem("theme"); // light Or dark

  if (themeData === "light") {
    mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
  } else {
    mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
  }

  document.body.setAttribute("data-theme", themeData); // light Or dark
}
let game = new Game();


// getGames("MMORPG")
//*===========================Events======================>

// change mode
document.getElementById("mode").addEventListener("click", function () {
  if (document.body.dataset.theme == "dark") {
    document.body.dataset.theme = "light";
    localStorage.setItem("theme", "light");
    this.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.dataset.theme = "dark";
    this.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

menu.addEventListener("click", (e) => {
  const active = menu.querySelector(".active");
  console.log(e.target.tagName, active);

  if (e.target.tagName == "A") {
    active.classList.toggle("active");
    e.target.classList.toggle("active");
    getGames(e.target.dataset.category);
  }
});

//!=========================== Functions ======================>

// async function getGames(category) {

//   loading.classList.remove('d-none')

// const api = await fetch(
//   `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
//   {
//     headers: {
//       "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
//       "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
//     },
//     method: "GET",
//   }
// );

// const data = await api.json();

// console.log(data);
// displayData(data);
// loading.classList.add('d-none')

// }

// function displayData(data) {
//   let temp = "";
//   data.forEach((game) => {
//     temp += `
//             <div class="col-md-6 col-lg-4 col-xl-3">
//             <div onclick="showDetaills(${game.id})" onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)" class="card bg-transparent h-100 shadow-sm">
//               <div class="card-body rounded-top overflow-hidden">
//                <div class="position-relative">
//                                    <video preload="none" loop class="d-none position-absolute top-0 h-100 w-100 " style="object-fit: cover; z-index: 1;"  poster="images/Loading-red-spot-unscreen.gif" muted>

//                         <source src="${game.thumbnail.replace(
//                           "thumbnail.jpg",
//                           "videoplayback.webm"
//                         )}" type="video/mp4">
//                     </video>
//                 <img
//                   src="${game.thumbnail}"
//                   class="w-100 rounded-top object-fit-cover"
//                   alt="game thumbnail "
//                 />
//                </div>
//                 <div class="hstack justify-content-between">
//                   <h3 class="fs-5">${game.title}</h3>
//                   <span class="highlight-badge badge p-2">Free</span>
//                 </div>
//                 <p class="opacity-50 small card-text text-center">
//                    ${game.short_description}
//                  </p>
//               </div>

//               <div class="card-footer hstack justify-content-between ">
//                 <span class="badge badge-color">${game.genre}</span>
//                 <span class="badge badge-color">${game.platform}</span>
//               </div>
//             </div>
//           </div>
//         `;
//   });

//   document.querySelector("main .row").innerHTML = temp;
// }

// function playVideo(ele) {
//   console.log(ele.querySelector("video"));
//   const video = ele.querySelector("video");
//   video.classList.remove("d-none");
//   video.play();
// }
// function stopVideo(ele) {
//   console.log(ele.querySelector("video"));
//   const video = ele.querySelector("video");
//   video.classList.add("d-none");
//   video.pause();
// }
