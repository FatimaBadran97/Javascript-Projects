import get from './getElement.js';
import { hideLoading } from './toggleLoading.js';

const displayDrinks = ({ drinks }) => {
  const section = get('.section-center');
  const title = get('.title');

  if (!drinks) {
    hideLoading();
    title.textContent = 'Sorry, No Drinks Matched Your Search';
    section.innerHTML = null;
    return;
  }

  const newDrinks = drinks
    .map((item) => {
      const { idDrink: id, strDrinkThumb: image, strDrink: name } = item;
      return `  <a href="./drink.html" >
        <article class="cocktail" data-id=${id}>
          <img src=${image} alt="cocktail" />
          <h3>${name}</h3>
        </article>
      </a>`;
    })
    .join('');
  hideLoading();
  title.innerHTML = '';
  section.innerHTML = newDrinks;

  return section;
};

export default displayDrinks;
