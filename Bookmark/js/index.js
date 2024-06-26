var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkTableInput = document.getElementById("bookmarkTable");
var myModal = new bootstrap.Modal(document.getElementById("myModal"));

var myModalUpdate = new bootstrap.Modal(
  document.getElementById("myModalUpdate")
);

var siteNameUpdateInput = document.getElementById("siteNameUpdate");
var siteUrlUpdateInput = document.getElementById("siteUrlUpdate");

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

  if (isValid(siteNameInput) && isValid(siteUrlInput)) {
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));
    displayData();
    clearData();
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
  addRowsEvent();

}

function isValid(ele) {
  var regex;
  ele;
  // console.log(ele);
  if (ele.id == siteNameInput.id || ele.id == siteNameUpdateInput.id) {
    regex = /^\w{3,}( \w{3,})*$/g;
    // ele = ele.id == siteNameInput.id ? siteNameInput : siteNameUpdateInput;
  } else {
    regex =
      /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/g;
    // ele = ele.id ==siteUrlInput.id ? siteUrlInput : siteUrlUpdateInput;
  }

  if (regex.test(ele.value)) {
    ele.classList.add("is-valid");
    ele.classList.remove("is-invalid");
    return true;
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");

    return false;
  }
}

function clearData() {
  siteUrlInput.value = null;
  siteNameInput.value = null;
  siteNameInput.classList.remove("is-invalid", "is-valid");
  siteUrlInput.classList.remove("is-invalid", "is-valid");
}



/* UPDATE METHODS FOE POP WINDOW */

function updateBookmark() {
  if (isValid(siteNameUpdateInput) && isValid(siteUrlUpdateInput)) {
    bookmarks.splice(index, 1, {
      siteName: siteNameUpdateInput.value,
      siteUrl: siteUrlUpdateInput.value,
    });
  }
  else{
    myModal.show()
  }
  localStorage.setItem("bookmarkList", JSON.stringify(bookmarks));


  displayData();
}

function addRowsEvent() {
  var    rows = document.querySelectorAll("tbody tr");

  for (var j = 0; j < rows.length; j++) {

    rows[j].addEventListener("click", function (e) {
     
      if (e.target.tagName=='button'.toUpperCase()) {
        return
      }
      index = +e.target.parentNode.children[0].innerHTML - 1;
      console.log(index, bookmarks[index]);
      siteNameUpdateInput.value = bookmarks[index].siteName;
      siteUrlUpdateInput.value = bookmarks[index].siteUrl;
  
      myModalUpdate.show();
    });
  }
}


/* EVENTS */


document.querySelector(".inputs button").addEventListener("click", addBookmark);
siteUrlInput.addEventListener("input", function (e) {
  isValid(e.target);
});
siteNameInput.addEventListener("input", function (e) {
  isValid(e.target);
});
/* EVENTS FOR UPDATE POP WINDOW */
siteNameUpdateInput.addEventListener("input", function (e) {
  isValid(e.target);
});
siteUrlUpdateInput.addEventListener("input", function (e) {
  isValid(e.target);
});
document.getElementById("btnUpdate").addEventListener("click", updateBookmark);



//-----------------------------------------




