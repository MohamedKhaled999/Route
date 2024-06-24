//?=========================== Golabl ======================>
const url = new URL(location);
const id = url.searchParams.get("id");
const media = document.getElementById("media");
//!=========================== when Start ======================>
  if (localStorage.getItem("theme") != null) {
    const themeData = localStorage.getItem("theme"); // light Or dark
 
    if (themeData === "light") {
       mode.classList.replace("fa-sun", "fa-moon"); // sun to moon
    } else {
       mode.classList.replace("fa-moon", "fa-sun"); // moon to sun
    }
 
    document.body.setAttribute("data-theme", themeData); // light Or dark
 }
 
(async function () {
  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    {
      headers: {
        "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
      method: "GET",
    }
  );

  const data = await api.json();
  console.log(data);
  displayData(data);
})();

//*===========================Events======================>

// change mode
document.getElementById("mode").addEventListener("click", function () {
  if (document.body.dataset.theme == "dark") {
    document.body.dataset.theme = "light";
    localStorage.setItem("theme","light")
    this.classList.replace("fa-sun", "fa-moon");
  } else {
    document.body.dataset.theme = "dark";
    this.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme","dark")

  }
});

//!=========================== Functions ======================>
function displayData(data) {
  document.body.style.backgroundImage=`url(${data.thumbnail})`
  const gameContainer = document.querySelector(
    "main .container .row .col-md-8"
  );
  const mediaContainer = document.getElementById("media");
  let minimal = { ...data.minimum_system_requirements };

  gameContainer.children[0].innerHTML = `<a href="./home.html" class="">Home</a> / <span class="fw-bold text-info">${data.title}</span>`;
  gameContainer.children[1].innerHTML = data.title;
  gameContainer.children[1].innerHTML = "About " + data.title;
  gameContainer.children[3].innerHTML = data.description;
  gameContainer.querySelector(
    ".screenshots"
  ).children[0].innerHTML = `${data.title} Screenshots`;
  gameContainer.querySelectorAll("img").forEach((image, index) => {
    image.src = `${data.screenshots[index].image}`;
  });

  console.log(gameContainer.children[0]);
  console.log(minimal);
  if (data.minimum_system_requirements) {
    temp = "";
    for (const key in minimal) {
      temp += `
         <div>
          <span class="text-muted fw-bolder">${key}</span>
          <p class="">${minimal[key]}</p>
         </div>
     `;
    }
    gameContainer.querySelector("#minialContainer").innerHTML = temp;
  }

  mediaContainer.querySelector("video").poster = data.thumbnail;
  mediaContainer.querySelector("video").innerHTML = `  <source
                  src="${data.thumbnail.replace(
                    "thumbnail.jpg",
                    "videoplayback.webm"
                  )}"
                  type="video/mp4"
                />`;

  mediaContainer.querySelector("img").src = data.thumbnail;

  mediaContainer.querySelector("a").href = `${data.game_url}`;
}
