import { UI } from "./ui.module.js";
import { Meal } from "./meal.module.js";
export class Area {
  constructor() {
    // $("section").not("#categories-page").hide(0);
  }

  async getAreas() {
    try {
      $(".loading").fadeIn(0);
      $("body").css("overflow", "hidden");
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
      );

      let data = await respones.json();

      console.log(data);
      data = data.meals;
      new UI().displayAreas(data);

      $("#area-page .item").on("click", (e) => {
        this.goToMeals(e.currentTarget.dataset.area);
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
    await new Meal().getMealsWithFilter(`a=${name}`);
    // $(".loading").fadeOut(500, () => {
    //   $("body").css("overflow", "visible");
    // });
  }
}
