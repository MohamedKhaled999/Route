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

