import { hideLoading } from './toggleLoading.js';
import get from './getElement.js';

const displayDrink = (data) => {
  hideLoading();

  const drink = data.drinks[0];
  const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
  const list = [
    drink.strIngredient1,
    drink.strIngredient2,
    drink.strIngredient3,
    drink.strIngredient4,
    drink.strIngredient5,
  ];

  const section = get('.single-drink');

  const ingredients = list
    .map((item) => {
      if (item) {
        return `<li><i class="far fa-check-square"></i>${item}</li>`;
      } else return;
    })
    .join('');

  section.innerHTML = `
   <img src=${image} class="drink-img" alt="" />
      <article class="drink-info">
        <h2 class="drink-name">${name}</h2>
        <p class="drink-description">${desc}</p>
        <ul class="drink-ingredients">
        ${ingredients}
        </ul>
        <a href="./index.html" class="btn">all cocktails</a>
      </article>
  `;
};

export default displayDrink;
