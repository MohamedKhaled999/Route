import { UI } from "./ui.module.js";
export class Details {
  constructor() {
    $('section').hide(0)
    

  }

  async getDetails(id) {
    try {
      let respones = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      let data = await respones.json();
      
    data = data.meals[0];
    console.log(data);


    new UI().displayDetails(data)
    $('#meal-deatils-page').fadeIn(500)

    } catch (error) {
      console.log(error);
    }
  }


}
