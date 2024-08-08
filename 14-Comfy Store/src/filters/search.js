import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
  const productsContainer = getElement('.products-container');
  const form = getElement('.input-form');
  const nameInput = getElement('.search-input');
  form.addEventListener('keyup', function () {
    const value = nameInput.value;
    if (value) {
      const newStore = store.filter((product) => {
        let { name } = product;
        name = name.toLowerCase();
        if (name.startsWith(value)) {
          return product;
        }
      });
      if (newStore.length < 1) {
        productsContainer.innerHTML = `<h3 class="filter-error"> sorry, no products matched your search</h3>`;
      } else {
        display(newStore, productsContainer, true);
      }
    } else {
      display(store, productsContainer, true);
    }
  });
};

export default setupSearch;
