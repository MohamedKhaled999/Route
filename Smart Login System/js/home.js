var logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  window.location = "./index.html";
  localStorage.removeItem("currentUser");
});

if (localStorage.getItem("currentUser")) {
  document.querySelector("h1").innerHTML = `Welcome    ${localStorage.getItem(
    "currentUser"
  )}
  `;
}
