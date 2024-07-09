/// <reference types="../@types/jquery"/>
const aside = $("aside");
const Hcontent = $("header .content");
//?=================Events=====================
$(".openNav").on("click", function () {
  if (aside.width() == 0) {
    aside.animate({ width: "250px" }, 500);
    Hcontent.animate({ left: "250px" }, 500);
  } else {
    aside.animate({ width: "0" }, 500);
    Hcontent.animate({ left: "0" }, 500);
  }
});

$("#leftMenu a[href]").on("click",(e)=>{
    
  var sectionId= $(e.target).attr("href");
  
  var positionOfSection = $(sectionId).offset().top;
  
  $("html , body").animate({scrollTop:positionOfSection},2000);
  
})
$("#closeBtn").on("click", function () {
  aside.animate({ width: "0" }, 500);
  Hcontent.animate({ left: "0" }, 500);
});

$("#slider h3").on("click", (e) => {
  $(e.target).siblings("p").not($(e.target).next()).slideUp(500);
  $(e.target).next().slideToggle(500);
});

$(window).on("load", () => {
  setDate(new Date(2024, 6, 27, 20, 42, 30, 0));
});

$('textarea').on('input',(e)=>{
  if($(e.target).val().length<100)
  $('#lengthOfLetters').html(100-$(e.target).val().length)
  else
  $('#lengthOfLetters').html("your available character finished")
})
//?=================Functions=====================


const setDate = (futureDate) => {
  let secondsDifference = Math.floor(
    (futureDate.getTime() - Date.now()) / 1000
  );

  let days = Math.floor(secondsDifference / (24 * 60 * 60));
  let hours = Math.floor((secondsDifference - days * 24 * 60 * 60) / (60 * 60));
  let mins = Math.floor(
    (secondsDifference - days * 24 * 60 * 60 - hours * 60 * 60) / 60
  );
  let secs =
    secondsDifference - days * 24 * 60 * 60 - hours * 60 * 60 - mins * 60;
  console.log(futureDate, days, hours, mins, secs);
  $("#counter p").eq(3).html(`${secs} s`);
  $("#counter p").eq(2).html(`${mins} m`);
  $("#counter p").eq(1).html(`${hours} h`);
  $("#counter p").eq(0).html(`${days} D`);

  udateDate(days, hours, mins, secs);
};

const udateDate = (days, hours, mins, secs) => {
  let x = setInterval(() => {
    if (secs - 1 >= 0) {
      $("#counter p").eq(3).html(`${--secs} s`);
    } else if (mins - 1 >= 0) {
      $("#counter p").eq(2).html(`${--mins} m`);
      secs = 60;
    } else if (hours - 1 >= 0) {
      $("#counter p").eq(1).html(`${--hours} h`);
      mins = 60;
    } else {
      if (days == 0) clearInterval(x);
      else {
        hours = 24;
        $("#counter p").eq(0).html(`${--days} D`);
      }
    }
  }, 1000);
};
