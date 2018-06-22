import axios from 'axios';
import {
  key,
  proxy
} from '../config';

export default class Recipe {

  constructor(id) {
    this.id = id;
  }

  async getRecipe() {

    try {
      const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;

    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }

  calcTime() {
    // Asumming we need 15 minutes for each 3 ingredients  
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 3;
  }

  calcServings() {
    this.calcServings = 4;
  }

  parseIngredients() {

    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort , 'kg', 'g'];



    const newIngredientes = this.ingredients.map(el => {
      // 1 Uniform Units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });
      // 2 Remove Parenthesis 
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3 parse ingredients into count, unit and ingredients 
      const arrIng = ingredient.split(' ');
      const  unitIndex = arrIng.findIndex(el2 => units.includes(el2));
      let objIng;

      if(unitIndex > -1 ){
        // There is an Unit

        // Example 4 1/2 cups, arrCount is [4 1/2] ---> eval ("4 1/2"  --> 4.5)
        // Example 4 cups, arrCount is [4]
       const arrCount= arrIng.slice(0, unitIndex) 
       let count;

       if(arrCount.length ===1 ){
         count = eval(arrIng[0].replace('-', '+'));
       }else{
         count = eval(arrIng.slice(0, unitIndex).join('+'));
       }

       objIng = {
        count,
        unit: arrIng[unitIndex],
       ingredient: arrIng.slice(unitIndex + 1).join(' ')
      };



      }
      else if (parseInt(arrIng[0],10)){
        // There is no unit , but 1st element is a number 
        objIng = {
          count:parseInt(arrIng[0],10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      }
      else if( unitIndex === -1){
       // there is No unit and No number in 1st Position
       objIng = {
         count:1,
         unit: '',
         ingredient
       }
      }




      
      return objIng;
    });

    this.ingredients = newIngredientes;

  }

}