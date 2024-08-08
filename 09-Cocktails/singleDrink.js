import fetchDrinks from './src/fetchDrinks.js';
import displayDrink from './src/displaySingleDrink.js';

const presentDrink = async () => {
  const id = localStorage.getItem('drink');
  if (!id) {
    window.location.replace('index.html');
  } else {
    const data = await fetchDrinks(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    displayDrink(data);
  }
};

window.addEventListener('DOMContentLoaded', presentDrink);
