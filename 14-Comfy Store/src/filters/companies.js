import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (store) => {
  const companies = [
    'all',
    ...new Set(store.map((product) => product.company)),
  ];

  const companiesDOM = getElement('.companies');

  companiesDOM.innerHTML = companies
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join('');
  companiesDOM.addEventListener('click', function (e) {
    const element = e.target;
    if (element.classList.contains('company-btn')) {
      const value = element.textContent;
      let newStore = [];
      if (value === 'all') {
        newStore = [...store];
      } else {
        newStore = store.filter((product) => product.company === value);
      }
      display(newStore, getElement('.products-container'), true);
    }
  });
};

export default setupCompanies;
