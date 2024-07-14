/// <reference types="../@types/jquery"/>
import { Meal } from "./meal.module.js";
import { Category } from "./categories.module.js";
import { Area } from "./area.module.js";
import { Ingredient } from "./ingredients.module.js";
const aside = $("aside");
const asideContent = $("aside .content");
const contactInputs = $("#contact-us-page input");

const meal = new Meal();

//!================= When Start =================

$(async () => {
  $(".loading").fadeOut(0);
  await meal.getMeals();
  $(".loading-outer").fadeOut(1000);
  document.body.style.visibility = "visible";
});

//?=================Events======================

$(".openNav").on("click", function () {
  if (aside.css("left") < "0") {
    openNav();
  } else {
    closeNav();
  }
});

$(".content a").on("click", async function (e) {
  console.log(`${e.target.getAttribute("to-show")}-page`);
  $("section").fadeOut(0);
  $(`${e.target.getAttribute("to-show")}-page`).fadeIn(500);

  switch (e.target.getAttribute("to-show")) {
    case "#search":
      // console.log(e.target);
      $("#search-page .search-inputs").removeClass("d-none");
      $("#search-page .search-inputs input").val("");
      $("#search-page .row").html("");

      break;
    case "#categories":
      
      await new Category().getCategories();

      break;
    case "#area":
      await new Area().getAreas();

      break;
    case "#ingredients":
      await new Ingredient().getIngredients();

      break;
    case "#contact-us":

  contactInputs.val("")
  contactInputs.removeClass('is-valid')
  contactInputs.removeClass('is-invalid')
  $("#submitBtn").attr("disabled",true);

      break;

    default:
      break;
  }
  closeNav();
});

contactInputs.on("input", (e) => {
  let input = e.target;
  isValid(input);

  console.log(contactInputs);

  if (
    isValid(contactInputs.eq(0).get(0), true) &&
    isValid(contactInputs.eq(1).get(0), true) &&
    isValid(contactInputs.eq(2).get(0), true) &&
    isValid(contactInputs.eq(3).get(0), true) &&
    isValid(contactInputs.eq(4).get(0), true) &&
    isValid(contactInputs.eq(5).get(0), true)
  ) {
    console.log("in submit")
    $("#submitBtn").removeAttr("disabled");
  }else{
    $("#submitBtn").attr("disabled",true);

  }
});

$('#contact-us-page form').on('submit',(e)=>{
  e.preventDefault();
  e.currentTarget.reset()
  contactInputs.removeClass('is-valid')
  $("#submitBtn").attr("disabled",true);
});

$("#search-page .search-inputs input").on("input", async (e) => {
  let input = $(e.target);
  $(".loading").fadeIn(0);
  $("body").css("overflow", "hidden");

  if (input.attr("maxlength") == 1) {
    await meal.getMeals(`f=${input.val()}`);
  } else {
    await meal.getMeals(`s=${input.val()}`);
  }
  $(".loading").fadeOut(500, () => {
    $("body").css("overflow", "visible");
  });
});


//=================Functions=====================

const openNav = () => {
  let currentWidth = $("aside .content").outerWidth(true);
  let extra = $("aside .content").css("paddingRight");
  aside.animate({ left: 0 }, 500);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  $("aside .content li").each((index, ele) => {
    // console.log(index, ele);
    $(ele).animate({ top: 0, left: 0 }, (5 + index) * 100);
  });
};
 export const closeNav = () => {
  let currentWidth = $("aside .content").outerWidth(true);
  aside.animate({ left: -currentWidth }, 500);
  $("aside .content li").animate({ top: 300  }, 1000);

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
};

//*===============Validation=====================
const isValid = (ele, checker) => {
  console.log(ele);
  var regex;

  switch (ele.name) {
    case "name":
      regex = /^[a-zA-Z ]+$/;
      break;

    case "email":
      regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;

    case "password":
      regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
      break;
    case "repassword":
      if (ele.value == $('#contact-us-page input[name="password"]').val()) {
        console.log($('#contact-us-page input[name="repassword"]').val());
        regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
      } else {
        regex = null;
      }
      break;
    case "age":
      regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
      break;
    case "phone":
      regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      break;
  }

  console.log(regex);
  console.log(ele.value);
  if (regex?.test(ele.value)) {
    if (!checker) {
      ele.classList.add("is-valid");
      ele.classList.remove("is-invalid");
    }

    return true;
  } else {
    if (!checker) {
      ele.classList.add("is-invalid");
      ele.classList.remove("is-valid");
    }
    console.log(ele, "is bad");

    return false;
  }
};
