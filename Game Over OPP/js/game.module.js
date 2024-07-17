import { Details } from "./detaills.module.js";
import { UI } from "./UI.module.js";
export class Game {
  constructor() {
    $("#loading").hide(0);
    this.getGames("MMORPG");
    $("#menu").on("click", (e) => {
      const active = $(e.currentTarget).find(".active");
      console.log(e.target.tagName, active);

      if (e.target.tagName == "A") {
        active.toggleClass("active");
        $(e.target).toggleClass("active");
        this.getGames(e.target.dataset.category);
      }
    });
  }

  async getGames(category) {
    let myModal = new bootstrap.Modal(document.getElementById("myModal"));

    let loading = $("#loading");
    // loading.removeClass("d-none");'
    loading.show(500);

    try {
      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
          method: "GET",
        }
      );

      const data = await api.json();
      console.log(data);
      // this.displayData(data);
      new UI().displayGames(data);


      let myGames = $("#home-page .my-games");

      myGames.on("mouseover", (e) => {
        this.playVideo(e.currentTarget);
      });
      myGames.on("mouseout", (e) => {
        this.stopVideo(e.currentTarget);
      });
      myGames.on("click", (e) => {
        this.GoToDetaills(e.currentTarget.dataset["gameId"]);
      });
    } catch (error) {
      console.log("ss",error);
      myModal.show();
    } finally {
      loading.hide(500);
    }
  }

  playVideo(ele) {
    console.log($(ele).find("video"));
    const videox = $(ele).find("video");
    videox.removeClass("d-none");
    videox.trigger("play");
  }
  stopVideo(ele) {
    console.log($(ele).find("video"));
    const video = $(ele).find("video");
    video.addClass("d-none");
    video.trigger("pause");
  }
  GoToDetaills(id) {
    // $('#home-page').animate({width:0,opacity:0,diplay:"none"},500)
    let loading = $("#loading");

    $("#home-page").fadeOut(500);
    loading.show(500);
    let details = new Details(id);
    loading.hide(500);
    $("#details-page").fadeIn(2000);
    
  }
}
