import { Drink } from '../../models/drink.model';

export default class Transform{

  public static transformData(drinks: any[]): Drink[]{
    let drinksT = drinks.map(drink => {
      let ingredients: string[] = [];
      Object.keys(drink).forEach(key =>{
        if(key.includes('strIngredient') && drink[key]) ingredients.push(drink[key]);
      });
      return {
        name: drink.strDrink,
        img: drink.strDrinkThumb,
        ingredients
      };
    });
    return drinksT;
  }
}