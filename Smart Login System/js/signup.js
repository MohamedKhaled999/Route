var signupBtn = document.getElementById("signupBtn");
var email = document.getElementById("email");
var pass = document.getElementById("pass");
var usreName = document.getElementById("usreName");
var myToast = new bootstrap.Toast(document.getElementById("myToast"));
console.log(myToast);

var users = [];

if (localStorage.getItem("user")) {
  users = JSON.parse(localStorage.getItem("user"));
}

function isValid(ele) {
  console.log(ele);
  var regex;
  if (ele.id == "email") {
    regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  } else if (ele.id == "pass") {
    regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,}$/;
  } else {
    regex = /^([a-z]+ ){1,2}([a-z]+)$/i;
  }

  console.log(regex);
  if (regex.test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");

    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    console.log(ele, "email is bad");

    return false;
  }
}

function isExist(email) {
  for (var i = 0; i < users.length; i++) {
    console.log(users[i]["email"]);
    if (users[i].email == email) {
      
      
      showMyToast("the email already exists","bg-danger");
      return true;
    }
   



  }
  return false;
}
signupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    isValid(email) &&
    isValid(pass) &&
    isValid(usreName) &&
    !isExist(email.value)
  ) {
    console.log("allvalid");
    users.push({
      name: usreName.value,
      email: email.value,
      password: pass.value,
    });

    localStorage.setItem("user", JSON.stringify(users));
    showMyToast("Success","bg-success")

    setTimeout(function () {
      window.location = "./index.html";
    }, 2000);
  }
});

email.addEventListener("change", function (e) {
  console.log(e.target);
  isValid(e.target);
});
pass.addEventListener("change", function (e) {
  isValid(e.target);
});
usreName.addEventListener("change", function (e) {
  isValid(e.target);
});

function showMyToast(meg,colorClass){

  var toast =document.getElementById("myToast");
  document.querySelector(".toast-body").innerHTML = meg;
  toast.classList.remove("bg-danger","bg-success");

    toast.classList.add(colorClass);
    myToast.show();
    setTimeout(function () {
      myToast.hide();
    }, 2000);
}