import { UI } from "./ui.module.js";
import { Meal } from "./meal.module.js";
export class Category {
  constructor() {
    // $("section").not("#categories-page").hide(0);
  }

  async getCategories() {
    try {
      $(".loading").fadeIn(0);
      $("body").css("overflow", "hidden");
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );

      let data = await respones.json();

      data = data.categories.slice(0,20);
      console.log(data);

      new UI().displayCategories(data);

      $("#categories-page .item").on("click", (e) => {
        this.goToMeals(e.currentTarget.dataset.category);
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
    await new Meal().getMealsWithFilter(`c=${name}`);
    // $(".loading").fadeOut(500, () => {
    //   $("body").css("overflow", "visible");
    // });
  }
}
