var loginForm = document.getElementById("loginForm");
var loginBtn = document.getElementById("loginBtn");
var email = document.getElementById("email");
var pass = document.getElementById("pass");
var myToast =new bootstrap.Toast(document.getElementById("myToast")) ;




if (localStorage.getItem("currentUser")) {

  window.location = "./home.html";

} 


loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if(isValid(email)&&isValid(pass)&&hasAuth(email.value,pass.value))
    window.location='./home.html'
});

email.addEventListener("change", function (e) {
  console.log(e.target);
  isValid(e.target);
});
pass.addEventListener("change", function (e) {
  isValid(e.target);
});

function hasAuth(email,password) {
  var users = [];
  if (localStorage.getItem("user")) {
    users = JSON.parse(localStorage.getItem("user"));
  }
  for (var i = 0; i < users.length; i++) {
   
    if (users[i].email == email &&users[i].password == password) {
      localStorage.setItem("currentUser",users[i].name)
     
      return true;
    }
  }
  myToast.show();
  setTimeout(function() {
    myToast.hide();
  },3500)
  return false;
}

function isValid(ele) {
  console.log("id", ele.id,ele.id=="email");
  var regex;
  if (ele.id == "email") {
    regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  } else {
    regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{6,}$/;
  }

  if (regex.test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");

    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
    console.log(ele, " is bad");

    return false;
  }
}
