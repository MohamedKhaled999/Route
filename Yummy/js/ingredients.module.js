import { UI } from "./ui.module.js";
import { Meal } from "./meal.module.js";
export class Ingredient {
  constructor() {
    // $("section").not("#categories-page").hide(0);
  }

  async getIngredients() {
    try {
      $(".loading").fadeIn(0);
      $("body").css("overflow", "hidden");
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );

      let data = await respones.json();

      data = data.meals.slice(0,20);
      console.log(data);

      new UI().displayIngredients(data);

      $("#ingredients-page .item").on("click", (e) => {
        this.goToMeals(e.currentTarget.dataset.ingredient);
      });
    } catch (error) {
      console.log(error);
    } finally {
      $(".loading").fadeOut(500, () => {
        $("body").css("overflow", "visible");
      });
    }
  }

  async goToMeals(name) {
    console.log(name);
    // $(".loading").fadeIn(500);
    // $("body").css("overflow", "hidden");
    await new Meal().getMealsWithFilter(`i=${name}`);
    // $(".loading").fadeOut(500, () => {
    //   $("body").css("overflow", "visible");
    // });
  }
}
