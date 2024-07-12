import { UI } from "./UI.module.js";
export class Details {
  constructor(id) {
    this.id = id;
    $("#closeDetails").on("click", () => {
      this.closeDetails();
    });
    console.log(id);
    this.getDetails();
  }

  async getDetails() {
    let myModal = new bootstrap.Modal(document.getElementById("myModal"));

    try {
      const api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`,
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
      let ui = new UI();
      await ui.displayDetaills(data);
    } catch (error) {
      console.log(error);
      myModal.show();
    }
  }

  closeDetails() {
    const mediaContainer = $("#details-page #media");
    let gameVideo = mediaContainer.find("video").html("");
    gameVideo.trigger("load");

    // let loading = $("#loading");
    $("#details-page").fadeOut(500);
    $("#home-page").fadeIn(1000);
    // loading.show(500);
    // loading.hide(500);
  }
}
