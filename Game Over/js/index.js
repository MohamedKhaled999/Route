//?===========================Golabl======================>
const inputs = document.querySelectorAll("input");
const logInBtn = document.getElementById("logInBtn");
const registeForm = document.querySelector("form");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const errorMessage = document.getElementById("errorMessage");
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

logInBtn.addEventListener("click", () => {});

registeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  setForm();
});

registeForm.addEventListener("input", (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName.toLowerCase() == "input") {
    isValid(e.target);
  }
});

//!===========================Functions======================>
function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };
  console.log(user);
  if (isValid(inputs[0]) && isValid(inputs[1])) {
    sendLoginForm(user);
  } else {
    console.log("errrorr in login form");
  }
}
async function sendLoginForm(user) {
  try {
    const api = await fetch("https://movies-api.routemisr.com/signin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await api.json();
    console.log(data);

    if (data.message == "success") {
      localStorage.setItem("uToken", data.token);
      window.location = "./home.html";
    } else {
      errorMessage.innerHTML = data.message;
      myModal.show();
    }
  } catch (error) {
    myModal.show();
    errorMessage.innerHTML = "please check your connection";
  }
}

//*===========================Validation======================>
function isValid(ele) {
  console.log(ele);
  var regex;

  switch (ele.id) {
    case "fName":
    case "lName":
      regex =
        /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
      break;

    case "email":
      regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      break;

    case "pass":
      regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      break;
    case "age":
      regex = /^([1-7][0-9]|80)$/;
      break;
  }

  console.log(regex);
  console.log(ele.value);
  if (regex.test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");

    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    console.log(ele, "is bad");

    return false;
  }
}
