import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {
  elements,
  renderLoader,
  clearLoader
} from './views/base';



/*  Global state of the app
    -Search Object
    -Current recipe object
    -Shopping list object
    -Liked recipes
*/

const state = {};

//SEARCH CONtROLLER

const controlSearch = async () => {
  // 1 Get query from the view
  const query = searchView.getInput();



  if (query) {
    // 2 New search object and add to state
    state.search = new Search(query);

    // 3 Prepare the UI for results 
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4 Search for recipes 
      await state.search.getResults();

      // 5 Render rusults in UI
      clearLoader();
      searchView.renderResults(state.search.result);


    } catch (err){
      alert("Something went wrong with the search...");
      clearLoader();
    }
  }
}



elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});




elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);

  }
});

//Recipe CONtROLLER

const controlRecipe = async () => {

  // Get the id from the URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight selected search item
    if(state.search) searchView.highLightSelected(id);    }

    // Create new recipe object
    state.recipe = new Recipe(id);



    try {

      // Get recipe data  and parse ingredients
      await state.recipe.getRecipe();
    state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render Recipe 
    clearLoader();
    recipeView.renderRecipe(state.recipe);

    } catch (err) {
      alert('Error Processing  Recipe');

    }
  }


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
//Or to add both in just one line
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));