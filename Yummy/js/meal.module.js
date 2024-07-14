import { UI } from "./ui.module.js";
import { Details } from "./deatils.module.js";
export class Meal {
  constructor() {
    $("section").hide(0);
    $("#search-page").fadeIn(0);
  }

  async getMeals(about = "s=") {
    try {
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?${about}`
      );

      let data = await respones.json();

      data = data.meals.slice();
      console.log(data);

      new UI().displayMeals(data);
      $("#search-page .item").on("click", (e) => {
        this.goToDeatils(e.currentTarget.dataset.mealId);
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getMealsWithFilter(about) {
    $("#search-page .search-inputs").addClass("d-none");
    $(".loading").fadeIn(0);
      $("body").css("overflow", "hidden");
    try {
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?${about}`
      );

      let data = await respones.json();

      data = data.meals.slice(0,20);
      console.log(data);

      new UI().displayMeals(data);
      $("#search-page .item").on("click", (e) => {
        this.goToDeatils(e.currentTarget.dataset.mealId);
      });
      $(`html,body`).animate({scrollTop:0},100)
    } catch (error) {
      console.log(error);
    }
    finally {
        $(".loading").fadeOut(500, () => {
          $("body").css("overflow", "visible");
        });
      }
  }

  async goToDeatils(id) {
    
    $(".loading").fadeIn(0);
    $("body").css("overflow", "hidden");
    await new Details().getDetails(id);
    $(".loading").fadeOut(500,()=>{
        $("body").css("overflow", "visible");

    });

  }
}
