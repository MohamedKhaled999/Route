// <reference types="../@types/jquery"/>

$(".openNav").on("click", function () {
  if ($("aside").width() == 0) {
    $("aside").animate({ width: "250px" }, 500);
    $(".content").animate({ left: "250px" }, 500);
  } else {
    $("aside").animate({ width: "0" }, 500);
    $(".content").animate({ left: "0" }, 500);
  }
});

$("#closeBtn").on("click", function () {
  $("aside").animate({ width: "0" }, 500);
  $(".content").animate({ left: "0" }, 500);
});
