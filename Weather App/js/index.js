const cityInput = document.getElementById("cityInput");
const mainContainer = document.querySelector("main .row");
const days = document.querySelectorAll("main .card");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const findBtn = document.getElementById("findBtn");

findBtn.addEventListener("click", function (e) {
  e.preventDefault();
    getData(cityInput.value);
});
cityInput.addEventListener("change", () => {
  getData(cityInput.value);
});

async function getData(city = "cairo") {
  try {
    const dataResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=a2109374c5df44d2902185626241906&q=${city}&days=3`
    );
    const data = await dataResponse.json();
    setData(data);

    console.log(data);
  } catch (error) {
    console.log("errrror", error);
    myModal.show();
  }
}

getData();

function setData(data) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(data.location.localtime);

  let curentDay = days[0];
  curentDay.children[0].children[0].innerHTML = daysOfWeek[d.getDay()];
  curentDay.children[0].children[1].innerHTML =
    d.getDate() + " " + monthNames[d.getMonth()];
  curentDay.children[1].children[0].innerHTML = data.location.name;
  curentDay.children[1].children[1].children[0].innerHTML = ` ${data.current.temp_c}<sup>o</sup>C`;
  curentDay.children[1].children[1].children[1].setAttribute(
    "src",
    data.current.condition.icon
  );

  curentDay.children[1].children[2].innerHTML = data.current.condition.text;
  console.log(document.querySelector('img[alt="humidity"]').nextSibling);
  document.querySelector(
    'img[alt="humidity"]'
  ).nextSibling.nodeValue = ` ${data.current.humidity}%`;

  document.querySelector(
    'img[alt="wind"]'
  ).nextSibling.nodeValue = ` ${data.current.wind_kph}km/h`;
  const compass = document.querySelector('img[alt="compass"]');
  compass.nextSibling.nodeValue = ` ${data.current.wind_dir}`;
  compass.style.rotate = `${data.current.wind_degree}deg`;

  let arrOfdays = data.forecast.forecastday;

  for (let i = 1; i < arrOfdays.length; i++) {
    // console.log(arrOfdays[i])

    days[i].children[0].children[0].innerHTML =
      daysOfWeek[(d.getDay() + i) % 7];

    days[i].children[1].children[0].setAttribute(
      "src",
      arrOfdays[i].day.condition.icon
    );
    days[
      i
    ].children[1].children[1].innerHTML = `${arrOfdays[i].day.maxtemp_c}<sup>o</sup>C`;
    days[
      i
    ].children[1].children[2].innerHTML = `${arrOfdays[i].day.mintemp_c}<sup>o</sup>C`;
    days[i].children[1].children[3].innerHTML = arrOfdays[i].day.condition.text;
  }
}
