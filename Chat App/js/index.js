import { handleLogin } from "./auth.js";

//?===========================Golabl======================>
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signupContainer = document.querySelector(".signup-form");
const signinContainer = document.querySelector(".signin-form");
const motions = document.querySelector(".motions");

const singInInputs = document.querySelectorAll(".signin-form input");
const singUpInputs = document.querySelectorAll(".signup-form input");

const signInForm = document.querySelector(".signin-form form");
const signUpForm = document.querySelector(".signup-form form");
//!===========================when Start======================>

//*===========================Events==========================>
signInBtn.addEventListener("click", (e) => {
  console.log(e.target);
  signUpBtn.classList.remove("selected");
  signInBtn.classList.add("selected");
  signupContainer.classList.remove("show");
  signinContainer.classList.add("show");

  motions.style.cssText = "border-radius: 0 20% 30%  0;";
});
signUpBtn.addEventListener("click", (e) => {
  console.log(e.target);
  signInBtn.classList.remove("selected");
  signUpBtn.classList.add("selected");
  signinContainer.classList.remove("show");

  signupContainer.classList.add("show");

  motions.style.cssText = "border-radius: 0 30% 20% 0;";
});
document.querySelector(".my-forms").addEventListener("submit", (e) => {
  if (e.target.tagName.toLowerCase() == "form") {
    e.preventDefault();
    console.log(e.target);
    setForm(e.target.id);
  }
});

//!===========================Functions======================>
async function setForm(id) {
  const user = {};
  let inputs;
  let isValidInputs = true;
  console.log(inputs);
  if (id == "in") {
    inputs = singInInputs;
  } else {

    inputs = singUpInputs;
  }

  for (const input of inputs) {
    if (!isValid(input)) {
      isValidInputs = false;
      break;
    }
  }
  if (isValidInputs) {
    user.email = inputs[0].value;
    user.password = inputs[1].value;
    let x = await handleLogin(user);
    console.log(x);
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
        /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,10}$/;
      break;

    case "email":
      regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      break;

    case "pass":
      // regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      regex = /^\d{6,}$/;
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
