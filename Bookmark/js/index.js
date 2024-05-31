var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkTableInput = document.getElementById("bookmarkTable");
var myModal = new bootstrap.Modal( document.getElementById("myModal"));

var bookmarks = [];

if (localStorage.getItem("bookmarkList") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarkList"));
  displayData();
}

function addBookmark() {
  var bookmark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };

  if (isValid(siteNameInput ) && isValid(siteUrlInput )) {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
    displayData();
    clearData()
  } else {
    var modal = 
    // modal.toggle();
    myModal.toggle();
    // console.log(myModal);
   
  }
}

function visitBookmark(i) {
  if (/^http/.test(bookmarks[i].siteUrl)) {
    open(bookmarks[i].siteUrl);
  } else {
    open("http://" + bookmarks[i].siteUrl);
  }
}

function deleteBookmark(i) {
  bookmarks.splice(i, 1);
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
  displayData();
}

function displayData() {
  var temp = "";
  for (var i = 0; i < bookmarks.length; i++) {
    temp += `
   <tr>
   <td>${i + 1}</td>
            <td>${bookmarks[i].siteName}</td>
            <td>
              <button onclick="visitBookmark(${i})"  class="btn btn-visit">
                <i class="fa-solid fa-eye pe-2"></i>
                Visit</button>
            </td>
            <td>
              <button onclick="deleteBookmark(${i})" class="btn btn-delete"
              
              >
              <i  class="fa-solid fa-trash-can"></i>
              Delete</button>
            </td>
            </tr>
   
   `;
  }

  bookmarkTableInput.innerHTML = temp;
}

function isValid(ele) {
  var regex;
  var eleInput;
  console.log(ele);
  if (ele.id == siteNameInput.id) {
    regex = /^\w{3,}( \w{3,})*$/g;
    eleInput = siteNameInput;
  } else {
    regex =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/g;
    eleInput = siteUrlInput;
  }

  if (regex.test(eleInput.value)) {
    eleInput.classList.add("is-valid");
    eleInput.classList.remove("is-invalid");
    return true;
  } else {
    eleInput.classList.add("is-invalid");
    eleInput.classList.remove("is-valid");

    return false;
  }
}

function clearData() {
  siteUrlInput.value = null;
  siteNameInput.value =null;
  siteNameInput.classList.remove("is-invalid","is-valid")
  siteUrlInput.classList.remove("is-invalid","is-valid")


}


document.querySelector('.inputs button').addEventListener('click',addBookmark);
siteUrlInput.addEventListener('input', function(e){ isValid(e.target)})
siteNameInput.addEventListener('input',function(e){ isValid(e.target)})