import { Meal } from "./meal.module.js";
import {  closeNav} from "./index.js";

export class UI {
  constructor() {
    closeNav();
  }

  displayIngredients(data) {
    let temp = "";
    data.forEach((ingredient, index) => {
      temp += `
           <div class="col-md-3">
            <div>
              <div data-ingredient="${ingredient.strIngredient}" class="item position-relative rounded-2 overflow-hidden">
                <div class=" text-center">
                  <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  <h3>${ingredient.strIngredient}</h3>
                  <p>
                    ${ingredient.strDescription.split(" ").slice(0,20).join(" ")}
                  </p>

                </div>
              </div>
            </div>
          </div>
        `;
    });

    $("#ingredients-page .row").html(temp);
  }

  displayAreas(data) {
    let temp = "";
    data.forEach((area, index) => {
      temp += `
            <div class="col-md-3">
            <div>
              <div data-area="${area.strArea}" class="item position-relative rounded-2 overflow-hidden">
                <div class="text-center">
                  <i class="fa-solid fa-house-laptop fa-4x"></i>
                  <h3>${area.strArea}</h3 </div>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    $("#area-page .row").html(temp);
  }

  displayCategories(data) {
    let temp = "";
    data.forEach((category, index) => {
      temp += `
            <div class="col-md-3">
            <div>
              <div data-category="${category.strCategory}" class="item position-relative rounded-2 overflow-hidden">
                <img src="${category.strCategoryThumb}" class="w-100" alt="food category" />
                <div class="item-layer position-absolute d-flex flex-column   align-items-center text-center">
                  <h3 class="text-black">${category.strCategory}</h3>
                   <p class="text-black py-0 my-0 t lh-sm  my-ls">${category.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    $("#categories-page .row").html(temp);
  }

  displayMeals(data) {
    let temp = "";
    data.forEach((meal, index) => {
      temp += `
        <div class="col-md-3">
              <div>
                <div data-meal-id="${meal.idMeal}" class="item position-relative rounded-2 overflow-hidden">
                  <img
                    src="${meal.strMealThumb}"
                    class="w-100"
                    alt="food"
                  />
                  <div
                    class="item-layer position-absolute d-flex align-items-center"
                  >
                    <h3 class="text-black">${meal.strMeal}</h3>
                  </div>
                </div>
              </div>
            </div>`;
    });

    $("#search-page .row").html(temp);
  }

  displayDetails(data) {
    $("#meal-deatils-page img").attr("src", data.strMealThumb);
    $("#meal-deatils-page #imgTitle").html(data.strMeal);
    $("#meal-deatils-page .description p").html(data.strInstructions);
    $("#meal-deatils-page .description .area").html(
      `<span class="fw-bolder ">Area : </span>${data.strArea}`
    );
    $("#meal-deatils-page .description .category").html(
      `<span class="fw-bolder ">Category  : </span>${data.strCategory}`
    );

    let i = 1;
    let temp = "";
    while (data["strIngredient" + i]) {
      temp += `<span class="alert alert-info p-1 m-0  align-self-start">
        ${data["strMeasure" + i]} ${data["strIngredient" + i]}</span>`;
      i++;
    }

    $("#meal-deatils-page .description .Recipes").html(temp);

    let tagsList = data.strTags?.split(",");
    let tags = "";
    if (!tagsList) tagsList = [];
    tagsList.forEach((tag, index) => {
      tags += `
                        <span class="alert alert-danger p-1 m-0   align-self-start">${tag}</span>

        `;
    });
    $("#meal-deatils-page .description .tags").html(tags);

    $("#meal-deatils-page .description .btn-success").attr(
      "href",
      data.strSource
    );
    $("#meal-deatils-page .description .btn-danger").attr(
      "href",
      data.strYoutube
    );
  }
}
