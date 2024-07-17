export class UI {
  constructor() {}

  displayGames(data) {
    let temp = "";
    data.forEach((game) => {
      temp += `
                  <div class="col-md-6 col-lg-4 col-xl-3">
                  <div  data-game-id="${
                    game.id
                  }" class="my-games card bg-transparent h-100 shadow-sm">
                    <div class="card-body rounded-top overflow-hidden">
                     <div class="position-relative">
                                         <video  loop class="d-none position-absolute top-0 h-100 w-100 " style="object-fit: cover; z-index: 1;"  poster="images/Loading-red-spot-unscreen.gif" muted>
      
                              <source src="${game.thumbnail.replace(
                                "thumbnail.jpg",
                                "videoplayback.webm"
                              )}" type="video/mp4">
                          </video>
                      <img
                        src="${game.thumbnail}"
                        class="w-100 rounded-top object-fit-cover"
                        alt="game thumbnail "
                      />
                     </div>
                      <div class="hstack justify-content-between">
                        <h3 class="fs-5">${game.title}</h3>
                        <span class="highlight-badge badge p-2">Free</span>
                      </div>
                      <p class="opacity-50 small card-text text-center">
                         ${game.short_description}
                       </p>
                    </div>
      
                    <div class="card-footer hstack justify-content-between ">
                      <span class="badge badge-color">${game.genre}</span>
                      <span class="badge badge-color">${game.platform}</span>
                    </div>
                  </div>
                </div>
              `;
    });

    $("main #home-page .row").html(temp);
  }

  displayDetaills(data) {
    console.log(data);

    $("main #details-page .container").css(
      "cssText",
      `
          background-image:linear-gradient( to left, rgba(39, 39, 41, 0.9), rgba(13, 13, 13, 0.9))  , url(${data.thumbnail});
          background-size: cover;
          background-position: center center`
    );

    const gameContainer = $("main #details-page .container .row .col-md-8");
    const mediaContainer = $("#details-page #media");
    let minimal = { ...data.minimum_system_requirements };

    gameContainer.children().eq(0).html(`Title: Tarisland${data.title}`);
    gameContainer.children().eq(1).html(`
      <p class="h5 fw-bolder"> Category: <span class="badge bg-info text-black">${data.genre}</span></p>
      <p class="h5 fw-bolder"> Platform: <span class="badge bg-info text-black">${data.platform}</span></p>
      <p class="h5 fw-bolder"> Status: <span class="badge bg-info text-black">${data.status}</span></p>
    `);
    gameContainer.children().eq(2).html(data.description);
    gameContainer
      .find(".screenshots")
      .children()
      .eq(0)
      .html(`${data.title} Screenshots`);
    gameContainer.find("img").each((index, image) => {
      console.log(index, image);
      image.src = `${data.screenshots[index].image}`;
    });

    console.log(!!data.minimum_system_requirements);
    console.log(minimal);
    if (data.minimum_system_requirements) {
      let temp = "";
      for (const key in minimal) {
        temp += `
             <div>
              <span class="text-muted fw-bolder">${key}</span>
              <p class="">${minimal[key]}</p>
             </div>
         `;
      }
      console.log(temp);
      gameContainer.find("#minialContainer").html(temp);
    }
    let gameVideo = mediaContainer.find("video");
    gameVideo.attr("poster", data.thumbnail);
    gameVideo.html(`  <source
                      src="${data.thumbnail.replace(
                        "thumbnail.jpg",
                        "videoplayback.webm"
                      )}"
                      type="video/mp4"
                    />`);

                    gameVideo.trigger("play");
                    gameVideo.attr("autoplay",true)
                    

    mediaContainer.find("img").attr("src", data.thumbnail);

    mediaContainer.find("a").attr("href", data.game_url);
  }
}