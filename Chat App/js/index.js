import { handleLogin, handleSignUp } from "./auth.js";
//?===========================Golabl==========================>
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signupContainer = document.querySelector(".signup-form");
const signinContainer = document.querySelector(".signin-form");
const motions = document.querySelector(".motions");
const singInInputs = document.querySelectorAll(".signin-form input");
const singUpInputs = document.querySelectorAll(".signup-form input");
const signInForm = document.querySelector(".signin-form form");
const signUpForm = document.querySelector(".signup-form form");
const inputFile = document.getElementById("");
var myToast = new bootstrap.Toast(document.getElementById("myToast"));
const loading = document.getElementById("loading");


//!===========================when Start======================>

//*===========================Events==========================>
signInBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  signUpBtn.classList.remove("selected");
  signInBtn.classList.add("selected");
  signupContainer.classList.remove("show");
  signinContainer.classList.add("show");

  motions.style.cssText = "border-radius: 0 20% 30%  0;";
});
signUpBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  signInBtn.classList.remove("selected");
  signUpBtn.classList.add("selected");
  signinContainer.classList.remove("show");
  signupContainer.classList.add("show");
  motions.style.cssText = "border-radius: 0 30% 20% 0;";
});
document.querySelector(".my-forms").addEventListener("submit", (e) => {
  if (e.target.tagName.toLowerCase() == "form") {
    e.preventDefault();
    // console.log(e.target);
    setForm(e.target.id);
  }
});

signInForm.addEventListener("change", (e) => {
  if (e.target.tagName.toLowerCase() == "input") {
    isValid(e.target);
  }
});

signUpForm.addEventListener("change", (e) => {
  if (e.target.tagName.toLowerCase() == "input") {
    isValid(e.target);
    if (e.target.type.toLowerCase() == "file") {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector('label img').src=e.target.result;
    }
      reader.readAsDataURL(e.target.files[0]);
      // console.log(e.target.files[0]);
      // document.querySelector('label img').src=e.target.files[0];

        
    }
  }
});
//!===========================Functions======================>
async function setForm(id) {
  const user = {};
  let inputs;
  let isValidInputs = true;
  // console.log(inputs);
  if (id == "in") {
    inputs = singInInputs;
    user.email = inputs[0].value;
    user.password = inputs[1].value;
  } else {
    inputs = singUpInputs;
    user.name = inputs[0].value + " " + inputs[1].value;
    user.email = inputs[2].value;
    user.password = inputs[3].value;
    user.imgFile = inputs[4].files[0];
  }

  for (const input of inputs) {
    if (!isValid(input)) {
      isValidInputs = false;
      break;
    }
  }
  if (isValidInputs && id == "in") {
    try {
      showMyToast("Please wait !", "bg-info");
      let x = await handleLogin(user);
      if (x) {
        showMyToast("Success", "bg-success");
        window.location="./home.html"
        signInForm.reset();
      }
    } catch (error) {
      console.log("me,", error);
      showMyToast(error.message, "bg-danger");
      // showMyToast("the email already exists","bg-danger");
    }
  }
  if (isValidInputs && id == "up") {
    try {
      showMyToast("Please wait !", "bg-info");
      loading.classList.remove("d-none");
      let x = await handleSignUp(user);
      loading.classList.add("d-none");
      signUpForm.reset();
      showMyToast("Success", "bg-success");
      signInBtn.click();
     
    } catch (error) {
      showMyToast(error.message, "bg-danger");
    }
    // console.log(x);
  }
}

function showMyToast(meg, colorClass) {
  var toast = document.getElementById("myToast");
  document.querySelector(".toast-body").innerHTML = meg;
  toast.classList.remove("bg-danger", "bg-success");

  toast.classList.add(colorClass);
  myToast.show();
  setTimeout(function () {
    myToast.hide();
  }, 2000);
}

//*===========================Validation======================>
function isValid(ele) {
  // console.log(ele);
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
    case "imgFile":
      if(!ele.value){
        return true;
      }
      regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      break;
  }

  // console.log(regex);
  // console.log(ele.value);
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
