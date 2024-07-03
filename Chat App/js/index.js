const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signupContainer = document.querySelector(".signup-form");
const signinContainer = document.querySelector(".signin-form");
const motions = document.querySelector(".motions");

signInBtn.addEventListener("click", (e) => {
  console.log(e.target);
  signUpBtn.classList.remove("selected");
  signInBtn.classList.add("selected");
  signupContainer.classList.remove("show");
  signinContainer.classList.add("show");


  motions.style.cssText="border-radius: 0 20% 30%  0;"

});
signUpBtn.addEventListener("click", (e) => {

  console.log(e.target);
    signInBtn.classList.remove("selected");
  signUpBtn.classList.add("selected");
  signinContainer.classList.remove("show");

  signupContainer.classList.add("show");
  
 
  motions.style.cssText="border-radius: 0 30% 20% 0;"

  
});
